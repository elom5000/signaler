import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProblemes } from 'app/shared/model/problemes.model';

type EntityResponseType = HttpResponse<IProblemes>;
type EntityArrayResponseType = HttpResponse<IProblemes[]>;

@Injectable({ providedIn: 'root' })
export class ProblemesService {
  public resourceUrl = SERVER_API_URL + 'api/problemes';

  constructor(protected http: HttpClient) {}

  create(problemes: IProblemes): Observable<EntityResponseType> {
    return this.http.post<IProblemes>(this.resourceUrl, problemes, { observe: 'response' });
  }

  update(problemes: IProblemes): Observable<EntityResponseType> {
    return this.http.put<IProblemes>(this.resourceUrl, problemes, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProblemes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProblemes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
