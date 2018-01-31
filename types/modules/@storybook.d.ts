declare module '@storybook/react-native' {
  export function action(action: string): void
  export function addDecorator(addDecoratorFunction): void
  export function addDecoratorFunction(
    getStory: IGetStory
  ): React.ReactElement<{}>
  export function linkTo(storiesOf: string, story: string): {}
  export function storiesOf(
    name: string
  ): {
    addDecorator: (
      decorator: (getStory: () => {}) => JSX.Element
    ) => { add: (name: string, Component: () => JSX.Element) => void }
  }
  export type IGetStory = () => React.ReactElement<{
    headerLeft: () => void
    headerTitle: string
    headerRight: () => void
  }>
}
