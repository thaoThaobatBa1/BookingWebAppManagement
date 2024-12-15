import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Role {
  id: string;
  name: string;
  description: string;
}
@Component({
  selector: 'app-role',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})

export class RoleComponent implements OnInit {



  roles: Role[] = [];

  constructor() { }
  http = inject(HttpClient)
  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.http.get('https://localhost:7097/api/Auth/roles').subscribe((res: any) => {
      this.roles = res.$values;
    });
  }

  openCreateRoleModal() {

  }

  viewPermissions(role: Role) {

  }

  editRole(role: Role) {

  }

  deleteRole(roleId: string) {
    if (confirm('Bạn có chắc chắn muốn xóa vai trò này?')) {
      this.http.delete(`https://localhost:7097/api/Auth/xoá role${roleId}`).subscribe(() => {
        this.loadRoles();
      });
    }
  }
}



