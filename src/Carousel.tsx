import React from "react";
import { PetMedia, PetPhoto } from "petfinder-client";

interface Props {
  media: PetMedia;
}
interface State {
  active: number;
  photos: PetPhoto[];
}

class Carousel extends React.Component<Props, State> {
  public state = {
    photos: [],
    active: 0
  };

  public static getDerivedStateFromProps({ media }: Props) {
    let photos: PetPhoto[] = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }

  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index
      });
    }
  };

  public render() {
    const { photos, active } = this.state;
    const activePhoto: PetPhoto = photos[active];
    return (
      <div className="carousel">
        <img src={activePhoto.value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo: PetPhoto, index) => (
            /* eslint-disable-next-line */
            <img
              onClick={this.handleIndexClick}
              key={photo.value}
              data-index={index}
              src={photo.value}
              className={index === active ? active.toString() : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
