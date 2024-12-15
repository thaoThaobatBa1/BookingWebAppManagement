import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  token: string | null = localStorage.getItem("token")
  loginName: string | null = localStorage.getItem("loginName")
  userRole: any | null = null
  constructor(private router: Router) {
    this.setUserRole()
    
  }
  hasRole(requiredRoles: string[]): boolean {
    if (!this.userRole || this.userRole.length === 0) return false;
  
    const hasRole = requiredRoles.some(role => this.userRole.includes(role));
    console.log(`Checking roles ${requiredRoles} against user roles ${this.userRole}: ${hasRole}`);
    return hasRole;
  }
  setUserRole() {
    if (this.token) {
      try {
        const parts = this.token.split('.');
        if (parts.length !== 3) {
          throw new Error("Invalid token format");
        }
  
        const payload = JSON.parse(atob(parts[1])); // Decode phần payload từ token
  
        // Truy cập vào key chứa role
        const roles = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (roles) {
          this.userRole = Array.isArray(roles) ? roles : [roles]; // Luôn gán userRole thành mảng
          console.log("User roles:", this.userRole); // Debugging
        } else {
          console.warn("No roles found in token payload:", payload);
          this.userRole = [];
        }
      } catch (error) {
        console.error("Error decoding token payload:", error);
        this.userRole = null;
        localStorage.removeItem("token");
      }
    } else {
      console.warn("No token found");
    }
  }


  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("loginName")
    this.userRole = null;
  }

  isCollapsed = false;
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.router.navigate([selectElement.value]);
  }
}
