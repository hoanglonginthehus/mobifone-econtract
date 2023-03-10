import { Component, TemplateRef } from '@angular/core';
import { OrganizationService } from "../organization.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {

  filterContent = [];
  searchKey: string = '';
  addContent: string = '';

  addForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.pattern('^[a-zA-Z0-9\s]*$')]],
    taxCode: ['', [Validators.required, Validators.pattern('^[0-9]{10}-[0-9]{3}$')]],
    shortName: [''],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    representative: ['', [Validators.required]],
    position: ['', [Validators.required]],
    size: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
    status: ['', [Validators.required]],
  });

  searchForm: FormGroup = this.fb.group({
    representative: [''],
    email: [''],
    phone: [''],
    status: [''],
    address: [''],
  });

  get form() {
    return this.addForm.controls;
  }

  constructor(private orgService: OrganizationService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
  }

  ngOnInit(): void { }

  openAddModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      if (result === 'save') {
        if (!this.addForm.valid) {
          alert('Du lieu khong hop le');
          return;
        } else {
          const val = this.addForm.value;
            this.orgService.addOrganization(val.name, val.code, val.taxCode, val.shortName, val.address, val.email, val.representative, val.position, val.size, val.phone, val.status).subscribe(response => {
              if (response.metadata !== undefined && response.errors[0].code === 1003) {
                alert('Tổ chức đã có trong hệ thống');
              } else {
                alert('Thêm tổ chức thành công');
                this.addContent = 'ADDED';
              }
            })
        }
      }
    }, (reason) => {
      console.log(reason);
    }
    )
  }

  openFilterModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      if (result === 'confirm') {
        const val = this.searchForm.value;
        this.orgService.filterOrganization(val.representative, val.email, val.phone, val.status, val.address).subscribe(response => {
          this.filterContent = response.entities;
        })
      }
    })
  }

}
