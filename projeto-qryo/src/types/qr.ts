export type DotType = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornerSquareType = 'dot' | 'square' | 'extra-rounded' | 'none';
export type CornerDotType = 'dot' | 'square' | 'none';

export interface QRStylingOptions {
  data: string;
  width: number;
  height: number;
  margin: number;
  dotsOptions: {
    color: string;
    type: DotType;
    gradient?: {
      type: 'linear' | 'radial';
      rotation: number;
      colorStops: { offset: number; color: string }[];
    };
  };
  backgroundOptions: {
    color: string;
  };
  imageOptions: {
    crossOrigin: string;
    margin: number;
    imageSize: number;
  };
  cornersSquareOptions: {
    color: string;
    type: CornerSquareType;
    gradient?: {
      type: 'linear' | 'radial';
      rotation: number;
      colorStops: { offset: number; color: string }[];
    };
  };
  cornersDotOptions: {
    color: string;
    type: CornerDotType;
    gradient?: {
      type: 'linear' | 'radial';
      rotation: number;
      colorStops: { offset: number; color: string }[];
    };
  };
  image?: string;
}
