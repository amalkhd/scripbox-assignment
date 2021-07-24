import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  tags: any[] = [{ value: 'feature', isActive: false }, { value: 'tech', isActive: false }];
  form: FormGroup;
  data: any = { getLoader: false, postLoader: false, isModelOpen: false, sort:{created_at:"", up_vote:""} };
  constructor(private _fb: FormBuilder, private api: ApiService, private common:CommonService) {
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
      this.common.showToastr("Challenge created successfully", "success")
      this.form.reset();
      this.resetTags();
      this.getChallenges();
    })
  }


  getChallenges(params = {}) {
    this.data.challenges = [];
    this.data.getLoader = true;
    this.api.getData("api/challenges", params).subscribe((res: any) => {
      this.data.getLoader = false;
      this.data.challenges = res.data;
    })
  }


  get isTagSelected() {
    return this.getTags().length
  }

  getTags() {
    return this.tags.filter(tag => tag.isActive).map(tag => tag.value);
  }

  resetTags() {
    this.data.postLoader = false;
    this.tags = this.tags.map(tag => {
      return { ...tag, isActive: false }
    });
  }

  onLikeclick(item) {
    if (this.isLiked(item)) {
      this.common.showToastr("Already upvoted", "error");
      return;
    }
    const userId = localStorage.getItem("authToken");
    item.likes = item.likes + 1;
    item.hasLiked.push({ customer: userId });
    this.api.postData("api/likes", { challengeId: item._id, userId }).subscribe(res => {
      console.log(res);
    })
  }

  isLiked(item) {
    return item.hasLiked.length
  }

  deleteChallenge(item) {
    this.api.deleteData(`api/challenges/${item._id}`).subscribe(res => { 
      this.getChallenges();
    })
  }

  onSortClick(field){
    const value = this.data.sort[field];
    if(value === 'desc') this.data.sort[field] = 'asc';
    if(value === 'asc') this.data.sort[field] = 'desc';
    if(!value) this.data.sort[field] = 'desc';

    this.getChallenges({[field]:this.data.sort[field]});

    for(const key in this.data.sort){
      if(key !== field){
        this.data.sort[key] = "";
      }
    }

  }
}
