import { PATH } from '../environment'


export const addPhoto = (imageData, providerId) => {
  fetch(`http://${PATH}:3000/providers/${providerId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      provider: {
        placeholder_image: imageData.file_name,
        image: imageData.data
      }
    })
  })
};
