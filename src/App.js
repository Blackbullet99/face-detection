import { Component } from "react";

import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";

import Navigation from "./components/navigation/navigation.component";
import FaceRecognition from "./components/face-recognition/face-recognition.component";
import Logo from "./components/logo/logo.component";
import ImageLinkForm from "./components/image-link-form/image-link-form.component";
import Rank from "./components/rank/rank.component";
import SignIn from "./components/sign-in/sign-in.component";
import Register from "./components/register/register.component";

import "./App.css";

const app = new Clarifai.App({
  apiKey: "02103a868c6a4e68a200f19be1dbc508",
});

class App extends Component {
  // const [input, setInput] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }

  //bounding box is the percentage of the image that the face is in

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box; //percentage of the image that the face is in

    //dom manipulation
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      leftCol: clarifaiFace.left_col * width,
    };
  };

  displayDetectionBox = (box) => {
    this.setState({ box: box });
  };

  onChangeHandler = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmitHandler = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayDetectionBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="circle" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onChangeHandler}
              onButtonSubmit={this.onButtonSubmitHandler}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;

//to get out calculation of the bounding box(calculateFaceLocation)
//total width * left_col = leftCol
