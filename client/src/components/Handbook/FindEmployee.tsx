import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Departament, Employee, Group, Profession, RootState, useAppDispatch, useAppSelector } from '../../redux/type';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import { delEmployees } from '../../redux/Thunk/deleteEmployees';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function FindEmployee() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);
  const departaments = useAppSelector((state: RootState) => state.employeesSlice.department);

  const deleteHandler = (id: number) => dispatch(delEmployees(id));

  const selectedEmployee = employees.find((employee: Employee) => employee.id === Number(id));
  const selectedGroup = groups.find((group: Group) => group.id === selectedEmployee?.groupId);
  const selectedProfession = professions.find((profession: Profession) => profession.id === selectedEmployee?.professionId);
  const selectedDepartament = departaments.find((department: Departament) => department.id === selectedGroup?.departamentId);

  const groupHead = employees.find((employee: Employee) => employee.id === selectedGroup?.groupHeadId);
  const departametHead = employees.find((employee: Employee) => employee.id === selectedDepartament?.departamentHeadId);

  const StyledAvatar = styled(Avatar)({
    width: 140,
    height: 140,
    marginTop: 40,
    borderRadius: '50%',
  });

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const professionId = userData?.professionId;

  useEffect(() => {
    document.title = `${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`;
    return () => {
      document.title = 'SoftMaster';
    };
  }, []);

  return (
    <Card
      sx={{
        display: 'flex',
        maxWidth: 500,
        maxHeight: 250,
      }}
    >
      <StyledAvatar alt="Employee Photo" src={selectedEmployee?.photoUrl} />
      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {selectedEmployee?.firstName} {selectedEmployee?.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedProfession?.position}
        </Typography>
        {selectedEmployee?.professionId === 4 ? null : (
          <Typography variant="body2" color="text.secondary">
            {selectedGroup?.title}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {selectedDepartament?.title}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary" style={{ marginLeft: '8px' }}>
            {selectedDepartament?.location}
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PhoneIcon fontSize="small" color="inherit" />
          <Typography variant="body2" color="text.secondary" style={{ marginLeft: '8px' }}>
            {selectedEmployee?.phone}
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <EmailIcon fontSize="small" color="inherit" /> {selectedEmployee?.email}
          </Typography>
        </div>
        {selectedEmployee?.professionId === 4 ? null : selectedEmployee?.professionId === 3 ? (
          <Typography variant="body2" color="text.secondary">
            Руководитель:{' '}
            <Link to={`/employee/${departametHead?.id}`}>
              {departametHead?.firstName} {departametHead?.lastName}
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Руководитель:{' '}
            <Link to={`/employee/${groupHead?.id}`}>
              {groupHead?.firstName} {groupHead?.lastName}
            </Link>
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <HighlightOffIcon fontSize="large" onClick={() => navigate(-1)}>
          Назад
        </HighlightOffIcon>
      </CardActions>
      {professionId === 5 ? (
        <DeleteIcon
          onClick={() => {
            if (selectedEmployee?.id) {
              deleteHandler(selectedEmployee.id);
            }
          }}
        >
          Удалить сотрудника
        </DeleteIcon>
      ) : null}
    </Card>
  );
}
