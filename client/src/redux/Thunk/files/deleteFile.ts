import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { delFileFromRedux } from '../../slicers/file.slice';
import { RootState } from '../../type';

export const delFileFromBack = (id: number) => async (dispatch: ThunkDispatch<RootState, any, AnyAction>) => {
  try {
    const response = await fetch(`http://localhost:3000/documents/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const result = await response.json();

    if (result.msg) {
      dispatch(delFileFromRedux(id));
    }
  } catch (error) {
    console.error(error);
  }
};
