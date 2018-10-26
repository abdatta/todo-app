import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Stat } from '../stat-model/stat.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats: Stat[] = [];
  total: Stat = {username: 'total', created: 0, deleted: 0};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getStats()
      .subscribe(stats => {
        this.stats = stats;
        stats.forEach(stat => {
          this.total.created += stat.created;
          this.total.deleted += stat.deleted;
        });
      });
  }

  logout() {
    this.authService.logout();
  }

}
