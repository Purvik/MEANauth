import { Component, OnInit } from '@angular/core';
import { ValidateService}  from '../../services/validate.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: String;
  description : String;

  suggestionList : [];
  
  constructor(
    private validateService : ValidateService,
    private flashMessage : FlashMessagesService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.authService.getSuggestionList()
    .subscribe(suggestionList => {
      console.log(JSON.stringify(suggestionList));
      this.suggestionList = suggestionList;
    });
  }

  onSuggestionSubmit(){
    console.log("On Suggestion Submit Called");

    const suggestion = {
      title: this.title,
      description : this.description,
      status: "SUBMITTED"
    }

    console.log("Suggestion : " + JSON.stringify(suggestion));

    if (!this.validateService.validateSuggestion(suggestion)) {
      this.flashMessage.show("Provide all the information", { cssClass: 'alert-danger', timeout: 2000 });
      return false;
    }

    this.authService.addSuggestion(suggestion)
    .subscribe(suggestion => {
      console.log(JSON.stringify(suggestion));
      if (suggestion.status) {
        this.flashMessage.show("Suggestion has been Submitted.", { cssClass: 'alert-success', timeout: 2000 });
        this.title = "";
        this.description = "";
        this.ngOnInit();
      }else{
        this.flashMessage.show("Something went wrong while submitting, Try Again !", { cssClass: 'alert-danger', timeout: 2000 });
      }
    },
    err => {
      console.log(err);
    });

    
    

  }

}
