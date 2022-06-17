import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoaderUtil} from '../utils/loader.util';
import { ExternalApp } from '../../../apps/common/external-app';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit, OnDestroy {

  private app?: ExternalApp;

  constructor(private route: ActivatedRoute, private elementRef: ElementRef) { }

  async ngOnInit(): Promise<void> {
    const { deps, url, name } = this.route.snapshot.data;

    await Promise.all(deps.map((d: string) => LoaderUtil.loadScript(d)));

    await LoaderUtil.loadScript(url);

    // just a quick hack for ts
    const win = window as any;

    this.app = win['externalApps'][name].default;

    this.app?.init();
    this.app?.attach(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.app?.detach();
  }
}
