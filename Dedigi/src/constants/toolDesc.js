import { ReactComponent as SelectionIcon } from '../assets/images/colored-icons/selection-ic.svg';
import { ReactComponent as LineIcon } from '../assets/images/colored-icons/line-ic.svg';
import { ReactComponent as PentoolIcon } from '../assets/images/colored-icons/pentool-ic.svg';
import { ReactComponent as PointIcon } from '../assets/images/colored-icons/point-ic.svg';
import { ReactComponent as GridIcon } from '../assets/images/colored-icons/grid-ic.svg';
import { ReactComponent as DiffIcon } from '../assets/images/colored-icons/diff-ic.svg';

const toolDetails = [
  {
    id: 'selection',
    available: true,
    name: 'Selection Tool',
    desc: "Select this tool mode to be in the selection state, with no other tools involved. In this mode, the mouse cursor is only used for actions that is not related to other tool mode such as selecting methods' details, choosing another tool mode, etc.",
    icon: SelectionIcon,
  },
  {
    id: 'line',
    available: true,
    name: 'Line Tool',
    desc: 'Select this tool mode to draw lines on the image.',
    url: 'https://www.youtube.com/embed/osTUhc8OWdA',
    icon: LineIcon,
    images: ['assets/images/demo/demo-line.png', 'assets/images/demo/demo-line-2.png'],
    instructions: {
      desc: 'The below actions are available for this tool mode:',
      details: [
        {
          name: 'Add a new line',
          desc: 'Add a new line on the centered container by clicking on the button "Add a new line".',
        },
        {
          name: 'Delete selected line',
          desc: 'Delete selected line by first selecting the line on the centered container, then click on the button "Delete selected line".',
        },
        {
          name: 'Change stroke width',
          desc: 'Change the width of the line by dragging the "Stroke width" slider, or by dragging the center bottom square up and down. The range on the slider is from 1px to 10px.',
        },
        {
          name: 'Rotate the line',
          desc: 'Rotate the line by first clicking on the line on the centered container, then drag the center top square to do the rotation.',
        },
        {
          name: 'Change length of the line',
          desc: 'Change the length of the line by first clicking on the line, then drag either squares on left and right side to reduce or increase the length.',
        },
        {
          name: 'Actions for the image',
          desc: 'In this mode, the image can be rotated, resized, and moved.',
        },
      ],
    },
    notes: [
      'The actions for create a line are hard to do, since for our tool, the line is always in the same position and same length when clicking Add a new line. In other applications, a line can be created by holding and dragging in any direction (dynamic position, length) - while using the line mode.',
      'The actions for rotating the line are also hard for the user, since the line tool requires the user to drag from the middle and the action is rigid. For other applications, the rotating can either be done by writing/increasing/decreasing a value, or dragging either end of the line to both increase the length and rotate the line.',
      "The line's color has yet to be changable.",
    ],
  },
  {
    id: 'pentool',
    name: 'Pentool Tool',
    available: false,
    desc: 'No description yet',
    icon: PentoolIcon,
    notes: ['Not yet implemented'],
  },
  {
    id: 'point',
    available: false,
    name: 'Point Tool',
    desc: 'No description yet',
    icon: PointIcon,
    notes: ['Not yet implemented'],
  },
  {
    id: 'grid',
    available: false,
    name: 'Grid Tool',
    desc: 'No description yet',
    icon: GridIcon,
    notes: ['Not yet implemented'],
  },
  {
    id: 'diff',
    available: true,
    name: 'Differences Tool',
    desc: 'This tool mode allows you to view the differences between the original image and the resulting image, either side by side, horizontally, or vertically.',
    url: 'https://www.youtube.com/embed/6amv8_7NJWQ',
    icon: DiffIcon,
    images: ['assets/images/demo/demo-dif-2.png', 'assets/images/demo/demo-ela-method.png', 'assets/images/demo/demo-dif.png'],
    instructions: {
      desc: 'The below actions are available for this tool mode:',
      details: [
        {
          name: 'Side by Side mode',
          desc: 'By clicking the button "Side by side", you can view the original picture and the resulting image after applying Digital Image Forensics technique, side by side.',
        },
        {
          name: '*Horizontal mode',
          desc: 'By clicking the button "Horizontal", a horizontal line will appear onto the image for you to drag an view the changes made. This line is draggable and separates the image into 2 parts, the top part is the resulting image, the bottom part is the original image',
        },
        {
          name: '*Vertical mode',
          desc: 'By clicking the button "Vertical", a vertical line will appear onto the image for you to drag an view the changes made. This line is draggable and separates the image into 2 sides, the left side is the resulting image, the right side is the original image',
        },
        {
          name: 'Change line color',
          desc: 'By clicking the button "Change line color (random)", you can change the color of the line in Horizontal mode and Vertical mode. The color is currently random.',
        },
      ],
    },
    notes: ['Horizontal mode and Vertical mode has yet to be implemented'],
  },
];

export default toolDetails;
