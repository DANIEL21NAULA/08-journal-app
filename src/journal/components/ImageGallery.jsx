import PropTypes from 'prop-types';
import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ images = [] }) => (
  <ImageList sx={{ width: '100%', height: 500 }} cols={5} rowHeight={164}>
    {
      images.map((image) => (
        <ImageListItem key={image}>
          <img
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            alt="Imagen de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))
    }
  </ImageList>
);

ImageGallery.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  images: PropTypes.array,
};
