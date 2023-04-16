import React from 'react';

interface Props {
  gameImageSource: string;
  gameName: string;
}

export default function GameImage(props: Props) {
  return <img alt={`${props.gameName} image`} src={props.gameImageSource} />;
}
