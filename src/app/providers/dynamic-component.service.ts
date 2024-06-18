import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable, createComponent, inject } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {
  private elementBody!: HTMLElement | null;
  private appRef = inject(ApplicationRef);

  public resolveComponentFactory(component: any): ComponentRef<any> {
    return createComponent(component, { environmentInjector: this.appRef.injector });
  }

  public addToBody(componentRef: any): string {
    if (!componentRef || !componentRef.hostView) {
      return '';
    }

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    if (!this.elementBody) {
      this.elementBody = document.body;
    }
    this.elementBody.appendChild(domElem);

    return '';
  }

  public remove(componentRef: any) {
    if (!componentRef) {
      return;
    }
    componentRef.hostView && this.appRef.detachView(componentRef.hostView);
    componentRef.destroy && componentRef.destroy();
  }
}