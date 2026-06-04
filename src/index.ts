import { CompositionRoot, type RepositoryType } from "./compositon-root.js";

const DEFAULT_REPOSITORY_TYPE: RepositoryType = 'InMemoryUserRepository';
const REPOSITORY_TYPES: RepositoryType[] = ['InMemoryUserRepository', 'DBJSONUserRepository'];

function isRepositoryType(value: string): value is RepositoryType {
    return REPOSITORY_TYPES.includes(value as RepositoryType);
}

function readRepositoryType(argv: string[]): RepositoryType {
    const repositoryType = argv[2] ?? DEFAULT_REPOSITORY_TYPE;

    if (!isRepositoryType(repositoryType)) {
        throw new Error(`Invalid repository type "${repositoryType}". Use one of: ${REPOSITORY_TYPES.join(', ')}`);
    }

    return repositoryType;
}

async function main(repositoryType: RepositoryType = readRepositoryType(process.argv)) {
    const di = new CompositionRoot(repositoryType);
    const presenter = di.buildPresenter();

    await presenter.initialize();
}

main();
