import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";

const SearchParams = () => {
  const [location, updateLocation] = useState("Seattle, WA");
  const [breeds, updateBreeds] = useState([]);
  const [pets, updatePets] = useState([]);

  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);

  useEffect(() => {
    updateBreed("");
    updateBreeds([]);
    pet.breeds(animal).then(({ breeds }) => {
      const breedsList = breeds.map(({ name }) => name);
      updateBreeds(breedsList);
    }, console.error);
  }, [animal]);

  async function requestPets() {
    const { animals: _pets } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    updatePets(_pets || []);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(event) => updateLocation(event.target.value)}
          />
        </label>

        <AnimalDropdown />
        <BreedDropdown />

        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
