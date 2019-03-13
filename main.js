console.log("Start")
let select;

const fetchDoggoBreeds = async () => {

  const data = await fetch('https://api.thedogapi.com/v1/breeds').then(data => data.json());
  populateDoggoSelect(data);
}

const populateDoggoSelect = (breeds) => {
  select = document.querySelector('.breed-select');
  const breedOptions = breeds.map(breed => {
    const option = document.createElement('option');
    option.text = breed.name;
    option.value = breed.id;
    return option;
  })

  breedOptions.forEach(breedOption => {
    select.appendChild(breedOption);
  })
}

const fillDoggoImage = (imageUrl) => {
  document.querySelector('#doggo-image').setAttribute('src', imageUrl);
  // select.insertAdjacentElement('afterend', doggoImageElement);

}

const createDescriptionEntry = ({label, value}) => {
  const descriptionTerm = document.createElement('dt');
  descriptionTerm.textContent = label;
  const descriptionValue = document.createElement('dd');
  descriptionValue.textContent = value;
  document.querySelector('#doggo-description').appendChild(descriptionTerm);
  document.querySelector('#doggo-description').appendChild(descriptionValue);
}

const clearDoggoDescription = () => {
  const descritpionElement = document.querySelector('#doggo-description');

  while(descritpionElement.firstChild) {
    descritpionElement.removeChild(descritpionElement.firstChild);
  }
}

const fillDoggoDescription = ({bred_for: bredFor, bred_group: bredGroup, name, temperament, life_span: lifeSpan, origin, height, weight}) => {
  clearDoggoDescription();
  createDescriptionEntry({
    label: 'Name',
    value: name
  })
  createDescriptionEntry({
    label: 'Bred for',
    value: bredFor
  })
  createDescriptionEntry({
    label: 'Bred group',
    value: bredGroup
  })
  
  createDescriptionEntry({
    label: 'Temperament',
    value: temperament
  })
  createDescriptionEntry({
    label: 'Life span',
    value: lifeSpan
  })
  createDescriptionEntry({
    label: 'Origin',
    value: origin
  })
  createDescriptionEntry({
    label: 'Height [cm]',
    value: height.metric
  })
  createDescriptionEntry({
    label: 'Weight [kg]',
    value: weight.metric
  })
}

const getDogByBreed = async (breedId) => {
  const loadingElement = document.querySelector('.loading');
  loadingElement.classList.add('show-loading');
  const [data] = await fetch('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breedId).then((data => data.json()))
  loadingElement.classList.remove('show-loading');
  const {url: imageUrl, breeds} = data;
  console.log(breeds[0]);
  fillDoggoImage(imageUrl);
  fillDoggoDescription(breeds[0]);
}


const changeDoggo = () => {
  getDogByBreed(event.target.value);
}

fetchDoggoBreeds();
