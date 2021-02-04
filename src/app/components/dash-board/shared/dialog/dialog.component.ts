import {
  Inject,
  ViewChild,
  TemplateRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  OnDestroy
} from '@angular/core';
import { Component, OnInit , VERSION} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit , OnDestroy {
  @ViewChild('target', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef | undefined ;
  componentRef: ComponentRef<any> | undefined | null;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    // @ts-ignore
    this.componentRef = this.vcRef.createComponent(factory);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
