import { CompositionRoot } from "./compositon-root.js";
import { UsersPresenter } from "./presentation/users-presenter.js";
import { UsersView } from "./presentation/users-view.js";


async function main() {
    const di = new CompositionRoot();
    const view = new UsersView();
    const presenter = new UsersPresenter(view, di.get('addUserUseCase'), di.get('getUsersUseCase'));
    await presenter.initialize();
}

main();