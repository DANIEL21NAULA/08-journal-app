import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dsubenfq8',
  api_key: '976812242616347',
  api_secret: 'yaapzZXjfzvDZzlQkY08XDvVQbk',
  secure: true,
});

describe('Pruebas en FileUpload', () => {
  test('Debe de subir el archivo correctamente a cloudinary', async () => {
    const imgurl = 'https://t3.ftcdn.net/jpg/00/96/00/80/360_F_96008063_XJOGkGwi5v4BKJ0iZX2qAjTpwE3Tw2SJ.jpg';
    const resp = await fetch(imgurl);
    const blob = await resp.blob();
    const file = new File([blob], 'image.jpg');
    const url = await fileUpload(file);
    expect(typeof url).toBe('string');
    const segments = url.split('/');
    const imageID = segments[segments.length - 1].replace('.jpg', '');
    // console.log(`${segments[segments.length - 2]}/${imageID}`);
    // const cloudRes =
    await cloudinary.api.delete_resources(
      [imageID],
      {
        resource_type: 'image',
      },
    );

    // console.log({ cloudRes });
  }, 30000);

  test('debe de retornar null', async () => {
    const file = new File([], 'image.jpg');
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
