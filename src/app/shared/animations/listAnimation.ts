import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({opacity: 0}), stagger('60ms', animate('600ms ease-out', style({opacity: 1})))],
      {optional: true}
    )
  ])
]);

export default listAnimation;
