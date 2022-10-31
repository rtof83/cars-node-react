import React, { useContext } from 'react';
// import { ListContext } from '../contexts/Contexts';
// import { useNavigate } from 'react-router-dom';

import CardMui from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CarsStamp from '../assets/cars.webp';

const Card = ({ id, image, name, desc, price }) => {
  return (
    <CardMui className='cardList' sx={{ maxWidth: 265, height: 345 }}>
      <CardHeader
        title={name}
      />
      <CardMedia
        component="img"
        height="190"
        image={image ? image : CarsStamp}
        alt={name}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AttachMoneyIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          R$ {parseFloat(price).toFixed(2)}
        </Typography>
      </CardActions>
    </CardMui>
  );
};

export default Card;
