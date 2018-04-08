import unexpected from "unexpected";
import unexpectedDom from "unexpected-dom";
import unexpectedReaction from "../src/";

const jestExpect = global.expect;

const expect = unexpected
  .clone()
  .use(unexpectedDom)
  .use(unexpectedReaction)

  .addAssertion("<any> to match snapshot", (expect, subject) => {
    jestExpect(subject).toMatchSnapshot();
  })
  .addAssertion(
    "<function> with error matching snapshot",
    (expect, subject) => {
      return expect.promise(() => subject()).then(
        () => expect.fail(),
        error => {
          if (error && error._isUnexpected) {
            expect(
              error.getErrorMessage("text").toString(),
              "to match snapshot"
            );
          } else {
            expect(error.message, "to match snapshot");
          }
        }
      );
    }
  );

expect.output.preferredWidth = 80;

export default expect;
