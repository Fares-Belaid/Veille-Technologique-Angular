import { Component, OnInit, Input } from '@angular/core';
import {RatingService} from "../../services/rating/rating.service";
import {Rating} from "../../models/rating";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() idf : number;

  rating = 0;
  starCount = 5;
  ratingArr: boolean[] = []; // true = solid star; false = empty star

  ratingback = new Rating()

  constructor(private ratingService: RatingService) {
    this.ratingArr = Array(this.starCount).fill(false);
  }

  ngOnInit(): void {
  }

  returnStar(i: number) {
    if (this.rating >= i + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  onClick(i: number) {
    this.ratingback.stars = i + 1;
    console.log(this.rating);
    this.ratingService.saveRating(this.ratingback,this.idf).subscribe(data =>{
      console.log(data);
      window.location.reload();
    })
      }



}
