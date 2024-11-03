// hooks/useTokenFromUrl.js
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const useTokenFromUrl = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Algo deu errado! :( ',
        text: 'Essa pesquisa é destinada a pessoas vinculadas ao CEU das artes, parece que o seu link tá errado. Por favor, acesse o link fornecido.',
        confirmButtonText: 'Responder mesmo assim.'
      });
    }
  }, []);

  return token;
};

export default useTokenFromUrl;