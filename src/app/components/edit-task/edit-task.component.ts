import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { Subscription} from 'rxjs';
import { UiService } from '../../services/ui.service'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  day: string;
  reminder: boolean;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.text) {
      alert('Please add a task');
      return;
    }

    const editTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onEditTask.emit(editTask)

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
