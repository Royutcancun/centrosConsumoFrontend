import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function Bares() {
    const paperStyle={padding:'10px 10px', width:350, margin:"10px auto", background:"#282c34"}
    const [nombre, setNombre] = React.useState('')
    const [categoria_id, setCategoriaId] = React.useState('')
    const [restaurantes, setRestaurantes] = React.useState([])

    //post
    const handleClick = (e)=>{
        e.preventDefault()
        const restaurante={nombre, categoria_id}
        console.log(restaurante)
        if(restaurante.nombre==="" || restaurante.categoria_id===""){
            console.log("Todos los campos son requeridos")
            alert("Todos los campos son requeridos")
        }else{
            fetch("http://localhost:8080/centros_consumo/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(restaurante)
        }).then(()=>{
            console.log("New centro de consumo added")
            alert("New centro de consumo added")
            window.location.reload();
        })
        }
        
    }

    //GET
    React.useEffect(()=>{
        fetch("http://localhost:8080/centros_consumo/getAll")
        .then(res => res.json())
        .then((result) =>{
            let filtRest = result.filter(res => res.categoria_id==="3");
            result = filtRest;
            setRestaurantes(result);
            
        }
    )
    },[])

  return (
    
    <Container>
        
        <h1>Bares</h1>

        <Paper elevation={3} style={paperStyle}>
            {restaurantes.map(restaurante => (

            <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left", 
            background:"#282c34", color:"white"}} key={restaurante.id} >
            Name:  {restaurante.nombre + " "} <br/>
            Concepto:  {restaurante.concepto_es + " "} <br/>
            Categoria:  {restaurante.categoria_id + " "}<br/>
            <p></p>
            <div >
            <Button id="btnVerMas" variant="outlined" elevation={8} style={{}} 
                    onClick={() => { alert(
                        restaurante.nombre + '\n'+
                        restaurante.concepto_es + '\n'
                       ) }}>
                        VER MÁS
                    </Button>

</div>

</Paper>
            )
            )}
        </Paper>

        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:'#1565c0'}}> <u>Add Restaurant</u> </h1>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField id="outlined-basic" label="Restaurant Name" variant="outlined" 
                    fullWidth 
                    required
                    value={nombre} 
                    onChange = {(e) => setNombre(e.target.value)}
                />
                <TextField id="outlined-basic" label="Restaurant Categoria" variant="outlined"
                    fullWidth
                    required
                    value={categoria_id} 
                    onChange = {(e) => setCategoriaId(e.target.value)}
                />
                <Button variant="contained" onClick={handleClick}>Submit</Button>
                
            </Box> {nombre} {categoria_id}
        </Paper>
    </Container>
  );
}