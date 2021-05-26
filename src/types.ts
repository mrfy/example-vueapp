export interface RibbonDataType {
  domain: {
    from: Date;
    to: Date;
  };
  states: [
    {
      period: {
        from: Date;
        to: Date;
      };
      description: string;
      color: string;
    }
  ];
}
