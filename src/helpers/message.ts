//Lista de tipos de mensaje de los enpoints

function exception(err: any) {
    if(typeof err === 'object' && err.name === 'Error' && err.message === 'Network Error') {
      return 'EL servidor no response';
    }
    if(typeof err === 'object') {
      if(err.response && err.response.status === 500) {
        return 'Error de Servidor';
      }
      if(err.response && err.response.data) {
        return err.response.data.message;
      }
    }
    return err;
}

export default {
    exception,
}