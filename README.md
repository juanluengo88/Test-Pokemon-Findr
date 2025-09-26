## Pokemon Findr



# Opcion 1: Verlo en la web 
Para ver el proyecto ya deployado en la web 
1) Acceder a esta Link(https://test-pokemon-findr-hgp1.vercel.app/)

# Requisitos del Sistema
# Opcion 2: Levantar el proyecto en docker

Para ejecutar este proyecto, solo necesitas tener Docker Desktop instalado en tu máquina.

Para ejecutar el proyecto segui los siguientes pasos

1) git clone https://github.com/juanluengo88/Test-Pokemon-Findr.git
2) Cd Test-Pokemon-Findr
3) Crear un .env y setear VITE_POKEAPI_BASE_URL = https://pokeapi.co/api/v2/
4) Contrui la imagen de docker (docker build -t pokemon-finder .)
5) Corre la imagen de docker en puerto 8080 (docker run -p 80:80 pokemon-finder)
6) Accede a la pagina y listo (http://localhost:8080) 


# A buscar Pokemons