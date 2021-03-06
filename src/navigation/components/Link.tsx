import React from 'react';
import { RouteName, Params } from 'navigation/types/RouteName';
import LinkBase, { LinkBaseProps } from './LinkBase';

export interface LinkProps<RouteNameT extends RouteName> extends Omit<LinkBaseProps, 'to' | 'push' | 'params'> {
  to?: RouteNameT | '../';
  push?: RouteNameT;
  params?: Params<RouteNameT>;
}

function Link<RouteNameT extends RouteName>({ ...rest }: LinkProps<RouteNameT>) {
  return <LinkBase {...rest} />;
}

export default Link;
