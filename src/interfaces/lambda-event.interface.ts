export interface LambdaEventParsingStrategy<TEvent, TDto, TParsingStrategyReturnType> {
  /**
   * Extrai e converte os dados do evento para o DTO
   */
  parseEventToDto(event: TEvent, dtoClass: new () => TDto): TParsingStrategyReturnType;

  /**
   * Verifica se a estratégia pode processar o tipo de evento
   */
  canHandle(event: unknown): event is TEvent;
}
