## Commands

    node merge.js
    cat `find ./blockchains/ethereum -name info.json` > ethereum.json
    cat `find ./blockchains/smartchain -name info.json` > bsc.json
    cat `find ./blockchains/bitcoin -name info.json` > bitcoin.json
    cat `find ./blockchains/tron -name info.json` > tron.json
    cat `find ./blockchains/solana -name info.json` > solana.json
    jq -s . ./json_files/* > ./all_protocols.json
    node ./scripts/generate_token_list.js
