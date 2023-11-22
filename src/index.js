import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async function () {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');
  const catImage = document.getElementById('cat-image');
  const catName = document.getElementById('cat-name');
  const catDescription = document.getElementById('cat-description');
  const catTemperament = document.getElementById('cat-temperament');

  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    breedSelect.addEventListener('change', async function () {
      const selectedBreedId = breedSelect.value;

      loader.style.display = 'block';
      catInfo.style.display = 'none';
      error.style.display = 'none';

      try {
        const cat = await fetchCatByBreed(selectedBreedId);
        catImage.src = cat.url;
        catName.textContent = `Breed: ${cat.breeds[0].name}`;
        catDescription.textContent = `Description: ${cat.breeds[0].description}`;
        catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

        // Adaugare stiluri descriere pisica direct pe elemente pentru aliniere
        catInfo.style.display = 'flex';
        catInfo.style.flexDirection = 'row';
        catImage.style.maxWidth = '60%';
        catImage.style.height = 'auto';
        catImage.style.marginRight = '10px';
        catText.style.display = 'flex';
        catText.style.flexDirection = 'column';
        catDescription.style.marginTop = '10px';
        catTemperament.style.marginTop = '10px';

        loader.style.display = 'none';
        catInfo.style.display = 'block';
      } catch (error) {
        loader.style.display = 'none';
        error.style.display = 'block';
      }
    });
  } catch (error) {
    loader.style.display = 'none';
    error.style.display = 'block';
  }
});
