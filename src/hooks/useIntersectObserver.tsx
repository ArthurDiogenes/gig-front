import { useEffect, useRef } from "react";

type UseIntersectObserverProps = {
  target: React.RefObject<HTMLElement>;
  hasNextPage: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchNextPage: () => Promise<any>;
};

export default function useIntersectObserver({
  target,
  hasNextPage,
  fetchNextPage,
}: UseIntersectObserverProps) {
  const isFetchingRef = useRef(false);

  useEffect(() => {
		// Se não houver próxima página, não precisa observar o elemento.
		if (!hasNextPage) {
			return
		}

		let animationFrameId: number

		// Função recursiva que aguarda o elemento target estar disponível no DOM.
		const waitForElement = () => {
			const element = target.current

			// Se o elemento ainda não estiver disponível, agendar nova tentativa.
			if (!element) {
				animationFrameId = requestAnimationFrame(waitForElement)
				return
			}

			// Elemento encontrado, criar o observer e observá-lo.
			const observer = new IntersectionObserver(
				(entries) => {
					const entry = entries[0]

					// Se o elemento estiver visível, e as condições de página e fetch estiverem atendidas:
					if (entry.isIntersecting && hasNextPage && !isFetchingRef.current) {
						// Marcar que o fetch está em andamento.
						isFetchingRef.current = true
						// Chamar a função assíncrona para buscar a próxima página.
						fetchNextPage()
							.catch((err) =>
								// Log em caso de erro durante o fetch.
								console.error('useIntersectObserver: fetchNextPage error', err),
							)
							.finally(() => {
								// Após o fetch (sucesso ou erro), liberar a flag para novas chamadas.
								isFetchingRef.current = false
							})
					}
				},
				{
					threshold: 0.1, // O callback é acionado quando 10% do alvo aparece na viewport.
				},
			)

			// Iniciar a observação do elemento target.
			observer.observe(element)

			// Retornar a função de cleanup para desconectar o observer ao desmontar ou atualizar.
			return () => {
				observer.unobserve(element)
				observer.disconnect()
			}
		}

		// Inicia o processo para aguardar o elemento.
		waitForElement()

		// Função de cleanup do useEffect: cancela a animação agendada caso o componente seja desmontado.
		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [target, hasNextPage, fetchNextPage])
}