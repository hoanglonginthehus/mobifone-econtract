import { Component, Input, SimpleChanges, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationService } from '../organization.service';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css']
})
export class OrganizationDetailsComponent {

  @Input() filterContent = [];
  @Input() searchKey = '';
  @Input() addContent = '';

  orgList: any[] = [];
  currentPage: number = 0;
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  pageNumber: number = 0;
  minPage = true;
  maxPage = false;

  updateForm: FormGroup = this.fb.group({
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

  

  get form() {
    return this.updateForm.controls;
  } 

  constructor(private orgService: OrganizationService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    this.orgService.getOrganizationList(this.currentPage).subscribe(response => {
      this.pageNumber = response.total_pages;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'filterContent') {
        this.orgList = this.filterContent;
      }
      if (propName === 'searchKey') {
        this.orgService.searchOrganization(changes[propName].currentValue, changes[propName].currentValue).subscribe((response: any) => {
          this.orgList = response.entities;
        })
      }
      if (propName === 'addContent') {
        this.ngOnInit();
      }
    }
  }

  ngOnInit(): void {
    this.orgList = [];
    this.orgService.getOrganizationList(this.currentPage).subscribe(response => {
      this.orgList = response.entities;
      this.pageNumber = response.total_pages;
    })
  }

  openDeleteModal(content: TemplateRef<any>, id: number) {
    this.modalService.open(content, { centered: true }).result.then(result => {
      if (result === 'confirm') {
        this.orgService.delOrganization(id).subscribe(
          () => {
            alert('Xóa thành công!!');
            this.ngOnInit();
          }
        )
      }
    }, (reason) => {
      console.log(reason);
    })
  }

  openUpdateModal(content: TemplateRef<any>, id: number) {
    this.orgService.getOrganization(id).subscribe(data => {
      this.updateForm = this.fb.group({
        name: [data.name, [Validators.required]],
        code: [data.code, [Validators.pattern('^[a-zA-Z0-9\s]*$')]],
        taxCode: [data.taxCode, [Validators.required, Validators.pattern('^[0-9]{10}-[0-9]{3}$')]],
        shortName: [data.shortName],
        address: [data.address, [Validators.required]],
        email: [data.email, [Validators.required, Validators.email]],
        representative: [data.representative, [Validators.required]],
        position: [data.position, [Validators.required]],
        size: [data.size, [Validators.required]],
        phone: [data.phone, [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
        status: [data.status, [Validators.required]],
      })
    })
    this.modalService.open(content, { centered: true }).result.then((result) => {
      if (result === 'save') {
        if (!this.updateForm.valid) {
          alert('Du lieu khong hop le');
          return;
        } else {
          const val = this.updateForm.value;
          this.orgService.updateOrganization(id, val.name, val.code, val.taxCode, val.shortName, val.address, val.email, val.representative, val.position, val.size, val.phone, val.status).subscribe(response => {
            try {
              alert('Sửa tổ chức thành công');
              this.ngOnInit();
            } catch (error) {
              console.log(error);
            }
          })
        }
      }
    }, (reason) => {
      console.log(reason);
    }
    )
  }

  prevPage() {
    this.currentPage -= 1;
    this.maxPage = false;
    if (this.currentPage <= 0) {
      this.currentPage = 0;
      this.minPage = true;
    }
    this.ngOnInit();
  }

  nextPage() {
    this.currentPage += 1;
    this.minPage = false;
    if (this.currentPage >= this.pageNumber-1) {
      this.currentPage = this.pageNumber-1;
      this.maxPage = true;
    }
    this.ngOnInit();
  }

}
