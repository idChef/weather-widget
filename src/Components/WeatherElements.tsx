import styled from "styled-components";
import { Lottie } from "@alfonmga/react-lottie-light-ts";
import rain from "../Assets/rain.json";
import mist from "../Assets/mist.json";
import clouds from "../Assets/clouds.json";
import clearsky from "../Assets/clearsky.json";
import fewclouds from "../Assets/fewclouds.json";
import snow from "../Assets/snow.json";
import thunderstorm from "../Assets/thunderstorm.json";
import { motion, AnimatePresence } from "framer-motion";

interface WeatherElementsProps {
  description: string;
  temperature: string;
  localization: string;
  color: string;
  id: number;
  icon: number;
}

const AnimationsReference = {
  "2": thunderstorm,
  "3": rain,
  "5": rain,
  "6": snow,
  "7": mist,
  "8": clouds,
  "800": clearsky,
  "801": fewclouds,
  "802": clouds,
  "803": clouds,
  "804": clouds,
  "9": clouds,
};

const StyledLottie = styled(Lottie)`
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const WeatherElements = ({
  description,
  temperature,
  localization,
  color,
  id,
  icon,
}: WeatherElementsProps) => {
  let code: string;

  if (icon >= 800) {
    code = icon.toString();
  } else {
    code = icon.toString()[0];
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
      >
        <a
          href={`https://openweathermap.org/city/${id}`}
          rel="noreferrer"
          target="_blank"
        >
          <WeatherContainer color={color}>
            <Description>{description}</Description>
            <InfoContainer>
              <Temperature>{temperature}&#176;</Temperature>
              <Localization>{localization}</Localization>
            </InfoContainer>
            <StyledLottie
              height="100px"
              width="100px"
              config={{ animationData: AnimationsReference[code], loop: true }}
            ></StyledLottie>
          </WeatherContainer>
        </a>
      </motion.div>
    </AnimatePresence>
  );
};

const WeatherContainer = styled(motion.div)`
  width: 99.9%;
  max-width: 400px;
  height: 120px;
  box-sizing: border-box;
  position: relative;
  background: linear-gradient(
    90.25deg,
    hsl(${(props) => props.color}, 60%, 56%) 0.21%,
    hsl(${(props) => props.color}, 69%, 75%) 99.77%
  );
  border-radius: 25px;
  //box-shadow: 0px 2px 10px 1px  hsl(${(props) => props.color},99%,36%);
  box-shadow: 0px 4px 10px 1px hsl(${(props) => props.color}, 99%, 36%);
  margin: 40px auto;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 760px) {
    width: 500px;
    height: 150px;
  }
`;

const Description = styled(motion.span)`
  position: absolute;
  left: 15px;
  top: 20px;
  color: #fff;
  font-size: 16px;
  padding-right: 150px;

  @media (min-width: 760px) {
    font-size: 20px;
    padding-right: 0;
    left: 30px;
  }

  &::first-letter {
    text-transform: capitalize;
  }
`;

const Localization = styled.span`
  color: #fff;
  font-size: 16px;
  text-align: left;
  margin-left: 25px;
  @media (min-width: 760px) {
    font-size: 20px;
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  left: 15px;
  bottom: 5px;

  @media (min-width: 760px) {
    left: 30px;
    bottom: 20px;
  }
`;

const Temperature = styled.span`
  position: relative;
  text-align: left;
  color: #fff;
  font-size: 40px;
  font-weight: 500;

  @media (min-width: 760px) {
    font-size: 60px;
  }

  &:after {
    content: "";
    width: 2px;
    height: 50px;
    position: absolute;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.48) 50.52%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 30px;
    right: -10px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
`;

export default WeatherElements;
