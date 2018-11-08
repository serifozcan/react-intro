import React from "react";
import pf, { PetResponse, PetMedia } from "petfinder-client";
import Carousel from "./Carousel";
import Modal from "./Modal";
import Loadable, { LoadableComponent } from "react-loadable";
import { RouteComponentProps, navigate } from "@reach/router";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("no api key");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const loading = () => <h1>loading !!!</h1>;

const LoadableContent = Loadable({
  loader: () => import("./AdoptModalContent"),
  loading
});

interface State {
  loading: boolean;
  showModal: boolean;
  name: string;
  animal: string;
  location: string;
  description: string;
  media: PetMedia;
  breed: string;
  error: Error;
}

class Details extends React.Component<
  RouteComponentProps<{ id: string }>,
  State
> {
  // public state = {
  //   loading: true,
  //   showModal: false
  // };
  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  public componentDidMount() {
    if (!this.props.id) {
      return;
    }
    petfinder.pet
      .get({ output: "full", id: this.props.id })
      .then((data: PetResponse) => {
        if (!data.petfinder.pet) {
          navigate("/");
          return;
        }
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }
        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch((err: Error) => this.setState({ error: err }));
  }
  public render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }
    const {
      name,
      animal,
      location,
      description,
      media,
      breed,
      showModal
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <LoadableContent toogleModal={this.toggleModal} name={name} />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
