import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Restaurant } from '@material-ui/icons';
import Restaurantes from '../components/Restaurantes';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    padding:'10px 10px', 
    width:350, 
    margin:"10px auto"
  },
  media: {
    height: 0,
    paddingTop: '56.25%',  16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Detalles() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const imgApi = 'https://api-onow.oasishoteles.net/';
  const [restaurantes, setRestaurantes] = React.useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //GET
  React.useEffect(()=>{
    fetch("http://localhost:8080/centros_consumo/getAll")
    .then(res => res.json())
    .then((result) =>{
        setRestaurantes(result);
    }
)
},[])

  return (
    <><h1>Detalles</h1>
    {restaurantes.map(restaurante => (
    <Card className={classes.root}>
        
          <CardHeader
              title={restaurante.nombre}
              subheader="February 2, 2023" />
          <CardMedia
              className={classes.media}
              image={imgApi+restaurante.img_portada}
              title={restaurante.nombre+" - "+restaurante.concepto_es} />
          <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                  {restaurante.concepto_es}
              </Typography>
          </CardContent>
          <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                  <ShareIcon />
              </IconButton>
              <IconButton
                  className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
              >
                  <ExpandMoreIcon />
              </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                  
              </CardContent>
          </Collapse>
      </Card>
      )
      )}
      </>
      
  );
}
