import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  loc;
  dist;
  results;
  constructor(private route: ActivatedRoute,private service:UsersService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params=> {
      this.loc = params.get('loc');
      this.dist = params.get('dist');
    });
   

   this.service.searchAllUsers(this.dist,this.loc).subscribe((response) => {
     response.forEach((resp)=>{
       resp.distance = Math.round(resp.distance/1609.34);
     });
     this.results = response;
   });
  }
  
}
