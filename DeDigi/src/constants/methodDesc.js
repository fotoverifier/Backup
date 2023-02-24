const methodDetails = [
  {
    id: 'ela',
    name: 'Error Level Analysis',
    desc: 'Error level analysis (ELA) is the analysis of compression artifacts with lossy compression such as JPEG. This is done by subtracting the original image to the new resaved image with a new JPEG quality.',
    url: 'https://www.youtube.com/embed/SwPJpIJsmNc',
    images: ['assets/images/demo/demo-ela.png', 'assets/images/demo/demo-ela-method.png'],
    instructions: {
      desc: 'Only similar regions between the original and the ELA result should be compared together: edges with edges, uniform color regions with uniform color regions, etc.',
      parameters: [
        {
          name: 'JPEG Quality',
          range: '[1, 100]',
          desc: 'The quality at which an image is compressed using the lossy compressed method. 100% quality means no loss. This value should match the JPEG quality of the original image',
        },
        {
          name: 'Error Scale',
          range: '[1, 20]',
          desc: 'The multiplier of the difference image between the original and the resaved image.\n/italic**Alert: Pixel value is from [0, 255], a big value of error scale will make all the errors (except the 0 value) go to 255 which is white',
        },
        {
          name: 'Opacity',
          range: '[0, 1]',
          desc: 'Reduce the opacity of the result, to compare it with the original image',
        },
      ],
    },
    pitfalls: {
      desc: 'The disadvantages of the current Error Level Analysis are:',
      details: [
        'The method is subjective, it is up to the user to interpret the result',
        'Difficulty in comparing the output of different regions',
        'Edges usually have high noise, interpreting the result much harder',
      ],
    },
  },
  {
    id: 'ghost',
    name: 'JPEG Ghost',
    desc: 'JPEG Ghost is the analysis of compression artifacts in digital data with lossy compression such as JPEG. It is done by subtracting the original image to the new resaved image with a new JPEG quality; then, the error image will be normalized and filtered to enhance local effects.',
    url: 'https://www.youtube.com/embed/qG2RmhMkpJk',
    images: ['assets/images/demo/demo-ghost.png', 'assets/images/demo/demo-ghost-method.png'],
    instructions: {
      desc: 'The output image will produce a GHOST which is regions that suggest tampering.',
      parameters: [
        {
          name: 'JPEG Quality',
          range: '[1, 100]',
          desc: 'The quality at which an image is compressed using the lossy compressed method. 100% quality means no loss. This value should match the JPEG quality of the original image',
        },
        {
          name: 'Opacity',
          range: '[0, 1]',
          desc: 'Reduce the opacity of the result, to compare it with the original image',
        },
      ],
    },
    pitfalls: {
      desc: 'The disadvantages of the current JPEG Ghost are:',
      details: [
        'The method is subjective, it is up to the user to interpret the result',
        'Edges usually have high noise, interpreting the result much harder',
      ],
    },
  },
  {
    id: 'artifact',
    name: 'Demosaicing Artifacts',
    desc: 'Exposing tampered regions with demosaicing artifacts is a technique that is based on artifacts created during the process of light going through the Color Filter Array (CFA) in most digital cameras.\n/italic** artifacts: features that appear in the resulting image but not in the original one\n/italic** color filter: a thin film that allows a certain component of light to pass through\n/italic*** CFA: mosaic of tiny color filters to capture color information.',
    // url: 'https://www.youtube.com/embed/v4atuiyJd7Y',
    images: ['assets/images/demo/demo-demosaicing.png', 'assets/images/demo/demo-demosaicing-method.png'],
    instructions: {
      desc: 'The tampered regions will be of brighter color to the other sections in the image, due to the calculated ratio being in the range of [0, 1]. If closer to 1 the output will be brighter.',
      parameters: [
        {
          name: 'Opacity',
          range: '[0, 1]',
          desc: 'Reduce the opacity of the result, to compare it with the original image',
        },
      ],
    },
    pitfalls: {
      desc: 'The disadvantages of the current Demosaicing Artifacts are:',
      details: [
        'The method is subjective since the users have to interpret the result',
        'The method is ineffective against images with strong JPEG re-compression and resizing',
        'The method is ineffective if the tampered region is too small',
      ],
    },
  },
  {
    id: 'mediannoise',
    name: 'Noise Median Analysis',
    desc: 'Images contain noises in them, so when a region is tampered with, there will be noise inconsistencies. These inconsistencies might be hard to view with normal eyes. To expose the forgeries, a Median-filter noise residue inconsistency is used.\nThis technique is based on noise inconsistencies left when an image has been tampered with. By applying a noise reduction filter (Median filter), and reversing the results, we will get the output image.',
    url: 'https://www.youtube.com/embed/Z9kc9qXnMVw',
    images: ['assets/images/demo/demo-noise-median.png', 'assets/images/demo/demo-noise-method.png'],
    instructions: {
      desc: 'The output image will have the tampered region of different noise inconsistencies and color range.',
      parameters: [
        {
          name: 'Noise Amplitude',
          range: '[1, 100]',
          desc: 'Make the noise brighter',
        },
        {
          name: 'Opacity',
          range: '[0, 1]',
          desc: 'Reduce the opacity of the result, to compare it with the original image',
        },
      ],
    },
    pitfalls: {
      desc: 'The disadvantages of the current Noise Median Analysis are:',
      details: [
        'The method is subjective since the users have to interpret the result',
        'The method only works on forgeries done on the original image since the noise inconsistencies will be more visible that way (not the screen-capturing of the new tampered image)',
      ],
    },
  },
  {
    id: 'geometric-physics',
    name: 'Geometric and Physics Analysis',
    desc: 'Geomtric Analysis focuses on image geometry such as 3d landscapes, rigid body movements, surface gradients to detect image manipulation. For Physics Analysis, it focuses on illumination source patterns, lighting inconsistencies, reflections and shadow direction.',
    url: 'https://www.youtube.com/embed/osTUhc8OWdA',
    images: ['assets/images/demo/demo-line-method.png'],
    instructions: {
      desc: 'User has to manually check for inconsistencies in the area of Geometric and Physics analysis by drawing lines, and determining if the reflections, or shadows, or any other aspects are plausible.',
      parameters: [
        {
          name: 'Line tool',
          desc: 'Use the line tool to draw lines, and rotate lines.',
        },
        {
          name: 'Point tool',
          desc: 'Use the point tool to draw circles/dots for intersections such as the vanishing point — vanishing point is the point where all lines meet.',
        },
      ],
    },
    pitfalls: {
      desc: 'The disadvantages of the current Geometric Analysis are:',
      details: [
        'User has to manually check for Reflection and Shadow inconsistencies',
        'The methods are sensitive since one pixel error can lead to a huge direction change, so it must be done with care',
      ],
    },
  },
  {
    id: 'metadata',
    name: 'Metadata Extraction',
    desc: 'JPEG format provides a way for software developers to put, change, or remove meta information in the digital image. All the relevant information such as image dimensions, Quantization table, Huffman code, thumbnail image, dimensions, and Exif metadata are stored in the JPEG Header. Metadata Extraction will reveal these informations inside the digital image for the user to view',
    images: ['assets/images/demo/demo-metadata.png'],
    instructions: {
      desc: 'Below are one of a few parameters in the metadata that the user can use to interpret the extraction result:',
      details: [
        'Modified Date: If the modified date is not the same as the original date: The image has been modified',
        'Header: The header may contain the tag of some image editing software like Adobe Photoshop, etc. This indicates that the image has been modified by a software',
        'Thumbnail: The thumbnail and the image are not the same',
        'Resolution: The image has a strange resolution that does not match with any type of camera. This suggests that the image may have undergone some procedures such as resizing or cropping',
      ],
    },
    pitfalls: {
      desc: 'The disadvantages of the current Metadata Extraction are:',
      details: [
        'Metadata can be easily replaced by programs, editing software',
        'Most social media strips Metadata when images get uploaded on their sites',
      ],
    },
  },
  {
    id: 'histogram',
    name: 'Color Histogram',
    desc: 'Color Histogram is the representation of the distribution of the color space RGB in an image.\n— The X axis of the histogram is the color value from 0 to 255, with 0 meaning zero light and 255 meaning maximum light. For example, (red=255, green=255, blue=0) where Red is maximum, Green is maximum, and Blue is not included, will generate a Yellow color.\n— The Y axis of the histogram is the number of pixels with the corresponding color value in the X axis.',
    images: ['assets/images/demo/demo-histo-red.png', 'assets/images/demo/demo-histo-green.png', 'assets/images/demo/demo-histo-blue.png'],
    instructions: {
      desc: 'The color histogram will be divided into three histograms:',
      details: [
        'Red histogram: Represents the color value distribution of the red channel in a pixel',
        'Green histogram: Represents the color value distribution of the green channel in a pixel',
        'Blue histogram: Represents the color value distribution of the blue channel in a pixel',
      ],
    },
  },
];

export default methodDetails;
