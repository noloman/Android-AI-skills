# Examples

LazyColumn {
  items(items, key = { it.id }) { item -> ItemRow(item) }
}

LaunchedEffect(userId) { viewModel.load(userId) }
