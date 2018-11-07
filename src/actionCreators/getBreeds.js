import pf from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

export default function getBreeds() {
  return function getBreedsThunk(dispatch, getState) {
    const { animal } = getState();
    if (animal) {
      petfinder.breed.list({ animal }).then(data => {
        let petfinder = data.petfinder;
        if (
          petfinder &&
          petfinder.breeds &&
          Array.isArray(petfinder.breeds.breed)
        ) {
          dispatch({ type: "SET_BREEDS", payload: petfinder.breeds.breed });
        } else {
          dispatch({ type: "SET_BREEDS", payload: [] });
        }
      });
    } else {
      dispatch({ type: "SET_BREEDS", payload: [] });
    }
  };
}
