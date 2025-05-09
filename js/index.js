let valueOfUser = document.getElementById("searchBar")
let button = document.getElementById("submitButton").addEventListener('click', getTitans)

// Let all the attributes values in the dom
let nameValue = document.getElementById('nameValue');
let heightValue = document.getElementById("heightValue");
let abilities = document.getElementById("abilities");
let allegiance = document.getElementById("allegiance");
let imageValue = document.getElementById("imageTitan");

class Titan{
    constructor(name, height, abilities, allegiance, image){
        this.name = name;
        this.height = height;
        this.abilities = abilities;
        this.allegiance = allegiance;
        this.image = image;
    }


    setName(value){
        value.innerHTML = this.name;
    }

    setHeight(value){
        value.innerHTML = this.height;
    }
    setAbilities(value){
        let c = 0;
        let values = ''
        for(let i in this.abilities){
            values +=  "--> " +this.abilities[i];
        }
        console.log(values)
        value.innerHTML = values;
    }
    
    setAllegiance(value){
        value.innerHTML = this.allegiance;
    }
    setImage(value){
        value.style.backgroundImage =  `url(${this.image})`;
    }
}






async function getTitans(){
    try{
        const response = await fetch("https://api.attackontitanapi.com/titans");
        // if the response is not good it will throw an error
        if(!response.ok){
            throw new Error("Could not fetch data")
        }
        // We store the data
        const data = await response.json();
        // will be the current value after the user inputs a value
        let currentObject = ''
        // settings the titans
        for(let ti of data.results){
            if(ti.name == valueOfUser.value){
                currentObject = ti; 
            }
        }
        // Here we store all of the data for the titan.
        let objectsDeatils = {
            name: currentObject.name,
            height: currentObject.height,
            abilities: currentObject.abilities,
            allegiance: currentObject.allegiance,
            image: currentObject.img
        };

        let newTitan = new Titan(
            objectsDeatils.name,
            objectsDeatils.height,
            objectsDeatils.abilities,
            objectsDeatils.allegiance,
            objectsDeatils.img
        ); 

        newTitan.setName(nameValue);
        newTitan.setHeight(heightValue);
        newTitan.setAbilities(abilities);
        newTitan.setAllegiance(allegiance);
        newTitan.setImage(imageValue);

        console.log(data)


        return data
    }
    catch(error){
        console.log(error);
    }
}

