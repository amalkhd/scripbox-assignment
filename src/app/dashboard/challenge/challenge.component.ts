import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  tags: any[] = [{ value: 'feature', isActive: false }, { value: 'tech', isActive: false }];
  form: FormGroup;
  data: any = { getLoader: false, postLoader: false, isModelOpen: false };
  constructor(private _fb: FormBuilder, private api: ApiService, public auth:AuthService) {
  }

  ngOnInit(): void {
    this.getChallenges();
  }


  onAddClick() {
    this.data.isModelOpen = true

    this.form = this._fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  createChallenge() {
    if (!this.isTagSelected) return;
    this.data.postLoader = true;
    const body = { ...this.form.value, tags: this.getTags() };
    this.api.postData("api/challenges", body).subscribe((res: any) => {
      this.data.postLoader = false;
      this.form.reset();
      this.resetTags();
      this.getChallenges();
    })
  }


  getChallenges() {
    this.data.getLoader = true;
    this.api.getData("api/challenges", { pageNum: 1 }).subscribe((res: any) => {
      this.data.getLoader = false;
      this.data.challenges = res.data;
    })
  }


  get isTagSelected() {
    return this.getTags().length
  }

  getTags() {
    return this.tags.map(tag => {
      if (tag.isActive) return tag.value;
    })
  }

  resetTags() {
    this.data.postLoader = false;
    this.tags = this.tags.map(tag => {
      return { ...tag, isActive: false }
    });
  }

  onLikeclick(item){
    this.api.postData("api/likes",{challengeId:item._id,})
  }

}
