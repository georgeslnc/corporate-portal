import React, { useEffect, useState } from 'react';
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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function FindEmployee() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const employees = useAppSelector((state: RootState) => state.employeesSlice.employees);
  const groups = useAppSelector((state: RootState) => state.employeesSlice.group);
  const professions = useAppSelector((state: RootState) => state.employeesSlice.profession);
  const departaments = useAppSelector((state: RootState) => state.employeesSlice.department);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const deleteHandler = (id: number) => {
    dispatch(delEmployees(id));
    setShowSuccessAlert(true); // Установка состояния, чтобы показать Alert
  };

  const selectedEmployee = employees.find((employee: Employee) => employee.id === Number(id));
  const selectedGroup = groups.find((group: Group) => group.id === selectedEmployee?.groupId);
  const selectedProfession = professions.find((profession: Profession) => profession.id === selectedEmployee?.professionId);
  const selectedDepartament = departaments.find((department: Departament) => department.id === selectedGroup?.departamentId);

  const groupHead = employees.find((employee: Employee) => employee.id === selectedGroup?.groupHeadId);
  const departametHead = employees.find((employee: Employee) => employee.id === selectedDepartament?.departamentHeadId);

  const StyledAvatar = styled(Avatar)({
    width: 140,
    height: 140,
    marginTop: 54.5,
    borderRadius: '50%',
    marginLeft: 5,
    marginRight: 'auto',
  });

  const StyledAvatar2 = styled(Avatar)({
    width: 140,
    height: 140,
    marginTop: 34.5,
    borderRadius: '50%',
    marginLeft: 5,
    marginRight: 'auto',
  });

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const professionId = userData?.professionId;

  useEffect(() => {
    document.title = selectedEmployee ? `${selectedEmployee?.firstName} ${selectedEmployee?.lastName}` : 'SoftMaster';
    return () => {
      document.title = 'SoftMaster';
    };
  }, []);

  if (!selectedEmployee) {
    return (
      <Stack sx={{ width: '100%', marginTop: '16px' }} spacing={2}>
        <Alert severity="success">Пользователь успешно удален!</Alert>
      </Stack>
    );
  }

  return (
    <Card
      sx={{
        display: 'flex',
        maxWidth: 500,
        maxHeight: 300,
      }}
    >
      {selectedEmployee?.professionId === 4 ? (
        <StyledAvatar2 alt="Employee Photo" src={selectedEmployee?.photoUrl} />
      ) : (
        <StyledAvatar alt="Employee Photo" src={selectedEmployee?.photoUrl} />
      )}

      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {selectedEmployee?.lastName} {selectedEmployee?.firstName} {selectedEmployee?.middleName}
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
        <HighlightOffIcon className="icon-cross-employee" fontSize="large" onClick={() => navigate(-1)}>
          Назад
        </HighlightOffIcon>
      </CardActions>
      {professionId === 5 ? (
        <DeleteIcon
          className="icon-delete-employee"
          onClick={() => {
            if (selectedEmployee?.id) {
              deleteHandler(selectedEmployee.id);
            }
          }}
        >
          Удалить сотрудника
        </DeleteIcon>
      ) : null}

      {showSuccessAlert && (
        <Stack sx={{ width: '100%', marginTop: '16px' }} spacing={2}>
          <Alert severity="success">Успешно удалено!</Alert>
        </Stack>
      )}
    </Card>
  );
}
