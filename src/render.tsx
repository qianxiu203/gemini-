import { jsx } from 'hono/jsx';

export const Render = ({ isAuthenticated, showWarning }: { isAuthenticated: boolean; showWarning: boolean }) => {
	if (!isAuthenticated) {
		return (
			<html>
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Gemini API 负载均衡器 - 登录</title>
					<script src="https://cdn.tailwindcss.com"></script>
					<style>{`
					@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
					body { font-family: 'Inter', sans-serif; }
					.gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
					.card-shadow { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
					.btn-primary { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
					.btn-primary:hover { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); }
				`}</style>
				</head>
				<body class="gradient-bg flex items-center justify-center min-h-screen p-4">
					<div class="w-full max-w-md">
						<div class="bg-white/95 backdrop-blur-sm rounded-2xl card-shadow p-8">
							<div class="text-center mb-8">
								<div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</div>
								<h1 class="text-2xl font-bold text-gray-800 mb-2">Gemini API 负载均衡器</h1>
								<p class="text-gray-600">请输入访问密钥以继续</p>
							</div>
							<form id="login-form">
								<div class="mb-6">
									<label class="block text-gray-700 text-sm font-semibold mb-3" for="auth-key">
										访问密钥
									</label>
									<input
										class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
										id="auth-key"
										type="password"
										placeholder="请输入您的访问密钥"
									/>
								</div>
								<button
									class="w-full btn-primary text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									type="submit"
								>
									登录
								</button>
							</form>
						</div>
					</div>
					<script
						dangerouslySetInnerHTML={{
							__html: `
                                document.getElementById('login-form').addEventListener('submit', async function(e) {
                                    e.preventDefault();
                                    const key = document.getElementById('auth-key').value;
                                    const response = await fetch(window.location.href, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ key }),
                                    });
                                    if (response.ok) {
                                        window.location.reload();
                                    } else {
                                        alert('登录失败');
                                    }
                                });
                            `,
						}}
					></script>
				</body>
			</html>
		);
	}

	return (
		<html>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Gemini API 负载均衡器 - 管理面板</title>
				<script src="https://cdn.tailwindcss.com"></script>
				<style>{`
				.sidebar-gradient { background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); }
				.card-gradient { background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%); }
				.btn-gradient-primary { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
				.btn-gradient-success { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
				.btn-gradient-warning { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
				.btn-gradient-danger { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
				.glass-effect { backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.95); }
			`}</style>
			</head>
			<body class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
				{showWarning && (
					<div class="glass-effect border-l-4 border-amber-500 text-amber-800 p-4 mb-6 mx-6 mt-6 rounded-xl shadow-lg" role="alert">
						<div class="flex items-center">
							<svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
							</svg>
							<strong class="font-semibold">安全警告</strong>
						</div>
						<p class="mt-2 text-sm">当前 HOME_ACCESS_KEY 或 AUTH_KEY 为默认值，请尽快修改环境变量并重新部署 Worker！</p>
					</div>
				)}
				<div class="flex min-h-screen">
					<div class="sidebar-gradient w-80 text-white p-6 flex flex-col shadow-2xl">
						<div class="flex items-center mb-8">
							<div class="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-3">
								<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<h1 class="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">负载均衡器</h1>
						</div>
						<nav class="flex flex-col space-y-3">
							<a href="#" id="nav-keys-list" class="flex items-center py-3 px-4 rounded-xl bg-slate-700/50 transition-all duration-200 hover:bg-slate-600/50 group">
								<svg class="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
								</svg>
								<span class="font-medium">密钥管理</span>
							</a>
							<a href="#" id="nav-add-keys" class="flex items-center py-3 px-4 rounded-xl transition-all duration-200 hover:bg-slate-600/50 group">
								<svg class="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
								<span class="font-medium">添加密钥</span>
							</a>
						</nav>
						<div class="mt-auto pt-6 border-t border-slate-600/50">
							<p class="text-slate-400 text-sm">Gemini API 负载均衡器</p>
							<p class="text-slate-500 text-xs">v1.0.0</p>
						</div>
					</div>
					<div class="flex-1 p-8 overflow-y-auto">
						<div id="page-keys-list">
							<div class="flex items-center mb-8">
								<h2 class="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">密钥管理</h2>
								<div class="ml-auto flex space-x-3">
									<button
										id="check-keys-btn"
										class="px-6 py-2.5 btn-gradient-success text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
									>
										<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										一键检查
									</button>
									<button
										id="refresh-keys-btn"
										class="px-6 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium shadow-sm"
									>
										<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
										</svg>
										刷新
									</button>
									<button
										id="select-invalid-keys-btn"
										class="px-6 py-2.5 btn-gradient-warning text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium ml-2 hidden"
									>
										勾选无效密钥
									</button>
								</div>
							</div>
							<div class="card-gradient p-8 rounded-2xl shadow-xl border border-slate-100">
								<div class="flex justify-between items-center mb-6">
									<h3 class="text-xl font-semibold text-slate-700">已存储的密钥</h3>
								</div>
								<div class="max-h-96 overflow-y-auto border border-slate-200 rounded-xl">
									<table id="keys-table" class="w-full text-left">
										<thead class="bg-gradient-to-r from-slate-50 to-slate-100">
											<tr class="border-b border-slate-200">
												<th class="p-4 w-6">
													<input type="checkbox" id="select-all-keys" class="rounded border-slate-300 focus:ring-blue-500" />
												</th>
												<th class="p-4 text-slate-600 font-semibold">API 密钥</th>
												<th class="p-4 text-slate-600 font-semibold">状态</th>
										<th class="p-4 text-slate-600 font-semibold">分组</th>
										<th class="p-4 text-slate-600 font-semibold">最后检查时间</th>
										<th class="p-4 text-slate-600 font-semibold">失败次数</th>
										<th class="p-4 text-slate-600 font-semibold">待删除原因</th>
											</tr>
										</thead>
										<tbody class="divide-y divide-slate-100"></tbody>
									</table>
								</div>
								<div id="pagination-controls" class="mt-6 flex justify-center items-center space-x-4">
									<button
										id="prev-page-btn"
										class="px-6 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 shadow-sm font-medium"
										disabled
									>
										<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
										</svg>
										上一页
									</button>
									<span id="page-info" class="text-slate-600 font-medium"></span>
									<button
										id="next-page-btn"
										class="px-6 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 shadow-sm font-medium"
										disabled
									>
										下一页
										<svg class="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</button>
								</div>
								<button
									id="delete-selected-keys-btn"
									class="mt-6 w-full px-6 py-3 btn-gradient-danger text-white rounded-xl hover:shadow-lg transition-all duration-200 hidden font-semibold"
								>
									<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									删除选中密钥
								</button>
								<div class="mt-4 grid grid-cols-3 gap-4">
									<button
										id="view-pending-keys-btn"
										class="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all duration-200 font-semibold"
									>
										<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
										</svg>
										查看待删除密钥
									</button>
									<button
										id="confirm-delete-keys-btn"
										class="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-semibold"
									>
										<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
										</svg>
										确认删除
									</button>
									<button
										id="restore-keys-btn"
										class="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 font-semibold"
									>
										<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
										</svg>
										恢复密钥
									</button>
								</div>
							</div>
						</div>
						<div id="page-add-keys" class="hidden">
							<div class="flex items-center mb-8">
								<h2 class="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">添加密钥</h2>
							</div>
							<div class="card-gradient p-8 rounded-2xl shadow-xl border border-slate-100">
								<h3 class="text-xl font-semibold mb-6 text-slate-700">批量添加密钥</h3>
								<form id="add-keys-form">
									<textarea
										id="api-keys"
										class="w-full h-48 p-4 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
										placeholder="请输入 Gemini API 密钥，每行一个密钥..."
									></textarea>
									<button
										type="submit"
										class="mt-6 w-full px-6 py-3 btn-gradient-primary text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
									>
										<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
										</svg>
										添加密钥
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>

				<script
					dangerouslySetInnerHTML={{
						__html: `
								document.addEventListener('DOMContentLoaded', () => {
										const addKeysForm = document.getElementById('add-keys-form');
										const apiKeysTextarea = document.getElementById('api-keys');
										const refreshKeysBtn = document.getElementById('refresh-keys-btn');
										const keysTableBody = document.querySelector('#keys-table tbody');
										const selectAllCheckbox = document.getElementById('select-all-keys');
										const deleteSelectedBtn = document.getElementById('delete-selected-keys-btn');
										const checkKeysBtn = document.getElementById('check-keys-btn');
										const viewPendingKeysBtn = document.getElementById('view-pending-keys-btn');
										const confirmDeleteKeysBtn = document.getElementById('confirm-delete-keys-btn');
										const restoreKeysBtn = document.getElementById('restore-keys-btn');
										const paginationControls = document.getElementById('pagination-controls');
										const prevPageBtn = document.getElementById('prev-page-btn');
										const nextPageBtn = document.getElementById('next-page-btn');
										const pageInfoSpan = document.getElementById('page-info');
										const selectInvalidKeysBtn = document.getElementById('select-invalid-keys-btn');

										const navKeysList = document.getElementById('nav-keys-list');
										const navAddKeys = document.getElementById('nav-add-keys');
										const pageKeysList = document.getElementById('page-keys-list');
										const pageAddKeys = document.getElementById('page-add-keys');

										let currentPage = 1;
										const pageSize = 50;
										let totalPages = 1;

										const showPage = (pageId) => {
											[pageKeysList, pageAddKeys].forEach(page => {
												if (page.id === pageId) {
													page.classList.remove('hidden');
												} else {
													page.classList.add('hidden');
												}
											});
											[navKeysList, navAddKeys].forEach(nav => {
												if (nav.id === \`nav-\${pageId.split('-')[1]}-\${pageId.split('-')[2]}\`) {
													nav.classList.add('bg-gray-700');
													nav.classList.remove('hover:bg-gray-700');
												} else {
													nav.classList.remove('bg-gray-700');
													nav.classList.add('hover:bg-gray-700');
												}
											});
										};

										navKeysList.addEventListener('click', (e) => {
											e.preventDefault();
											showPage('page-keys-list');
										});

										navAddKeys.addEventListener('click', (e) => {
											e.preventDefault();
											showPage('page-add-keys');
										});

										const updatePaginationControls = () => {
												pageInfoSpan.textContent = \`第 \${currentPage} / \${totalPages} 页\`;
												prevPageBtn.disabled = currentPage === 1;
												nextPageBtn.disabled = currentPage >= totalPages;
										};

										const fetchAndRenderKeys = async () => {
												keysTableBody.innerHTML = '<tr><td colspan="7" class="p-2 text-center">加载中...</td></tr>';
												try {
												  const response = await fetch(\`/api/keys?page=\${currentPage}&pageSize=\${pageSize}\`);
												  const { keys, total } = await response.json();
												  
												  totalPages = Math.ceil(total / pageSize);
												  keysTableBody.innerHTML = '';
												  if (keys.length === 0) {
												    keysTableBody.innerHTML = '<tr><td colspan="7" class="p-2 text-center">暂无密钥</td></tr>';
												  } else {
												    keys.forEach(key => {
												      const statusMap = { normal: '正常', abnormal: '异常', pending_deletion: '待删除' };
												      const statusClass = key.status === 'normal' ? 'text-green-500' : 
												                       key.status === 'abnormal' ? 'text-red-500' : 'text-yellow-500';
												      const row = document.createElement('tr');
												      row.className = 'hover:bg-slate-50 transition-colors';
												      row.dataset.key = key.api_key;
												      row.innerHTML = \`
												        <td class="p-3 w-6"><input type="checkbox" class="key-checkbox rounded border-slate-300" data-key="\${key.api_key}" \${key.status === 'pending_deletion' ? 'disabled' : ''} /></td>
												        <td class="p-3 font-mono text-sm text-slate-700">\${key.api_key}</td>
												        <td class="p-3 status-cell \${statusClass}">\${statusMap[key.status] || key.status}</td>
												        <td class="p-3">\${statusMap[key.key_group] || key.key_group}</td>
												        <td class="p-3 text-sm text-slate-500">\${key.last_checked_at ? new Date(key.last_checked_at).toLocaleString() : 'N/A'}</td>
												        <td class="p-3 text-center">\${key.failed_count}</td>
												        <td class="p-3 text-sm text-yellow-600">\${key.pending_deletion_reason || '-'}</td>
												      \`;
												      keysTableBody.appendChild(row);
												    });
												  }
												  updatePaginationControls();
												} catch (error) {
												  keysTableBody.innerHTML = '<tr><td colspan="7" class="p-2 text-center text-red-500">加载失败</td></tr>';
												  console.error('Failed to fetch keys:', error);
												}
										};

										const updateDeleteButtonVisibility = () => {
												const selectedKeys = document.querySelectorAll('.key-checkbox:checked');
												deleteSelectedBtn.classList.toggle('hidden', selectedKeys.length === 0);
										};

										keysTableBody.addEventListener('change', (e) => {
												if (e.target.classList.contains('key-checkbox')) {
												  updateDeleteButtonVisibility();
												}
										});

										selectAllCheckbox.addEventListener('change', () => {
												const checkboxes = document.querySelectorAll('.key-checkbox');
												checkboxes.forEach(checkbox => {
												  checkbox.checked = selectAllCheckbox.checked;
												});
												updateDeleteButtonVisibility();
										});

										deleteSelectedBtn.addEventListener('click', async () => {
												const selectedKeys = Array.from(document.querySelectorAll('.key-checkbox:checked')).map(cb => cb.dataset.key);
												if (selectedKeys.length === 0) {
												  alert('请至少选择一个密钥。');
												  return;
												}

												if (!confirm(\`确定要删除选中的 \${selectedKeys.length} 个密钥吗？\`)) {
												  return;
												}

												try {
												  const response = await fetch('/api/keys', {
												    method: 'DELETE',
												    headers: { 'Content-Type': 'application/json' },
												    body: JSON.stringify({ keys: selectedKeys }),
												  });
												  const result = await response.json();
												  if (response.ok) {
												    alert(result.message || '密钥删除成功。');
												    fetchAndRenderKeys();
												    updateDeleteButtonVisibility();
												    selectAllCheckbox.checked = false;
												  } else {
												    alert(\`删除密钥失败: \${result.error || '未知错误'}\`);
												  }
												} catch (error) {
												  alert('请求失败，请检查网络连接。');
												  console.error('Failed to delete keys:', error);
												}
										});

										checkKeysBtn.addEventListener('click', async () => {
								const rows = keysTableBody.querySelectorAll('tr[data-key]');
								const keysToCheck = Array.from(rows).map(row => row.dataset.key);

								if (keysToCheck.length === 0) {
									alert('没有可检查的密钥。');
									return;
								}

								// 禁用检查按钮，防止重复点击
								checkKeysBtn.disabled = true;
								checkKeysBtn.textContent = '检查中...';

								// 保存原始状态，用于检查失败时恢复
								const originalStatuses = {};
								rows.forEach(row => {
									const statusCell = row.querySelector('.status-cell');
									if (statusCell) {
										originalStatuses[row.dataset.key] = {
											text: statusCell.textContent,
											className: statusCell.className
										};
										statusCell.textContent = '检查中...';
										statusCell.className = 'p-3 status-cell text-blue-500 font-medium';
									}
								});

								try {
									const response = await fetch('/api/keys/check', {
										method: 'POST',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify({ keys: keysToCheck }),
									});
									
									if (response.ok) {
										// 检查完成后立即刷新密钥列表
										await fetchAndRenderKeys();
										
										// 添加短暂延迟，让用户看到检查完成的效果
										setTimeout(() => {
											alert('密钥检查完成！');
										}, 500);
									} else {
										const result = await response.json();
										alert(\`检查密钥失败: \${result.error || '未知错误'}\`);
										
										// 检查失败时恢复原始状态
										rows.forEach(row => {
											const statusCell = row.querySelector('.status-cell');
											if (statusCell && originalStatuses[row.dataset.key]) {
												statusCell.textContent = originalStatuses[row.dataset.key].text;
												statusCell.className = originalStatuses[row.dataset.key].className;
											}
										});
									}
								} catch (error) {
									alert('请求失败，请检查网络连接。');
									console.error('Failed to check keys:', error);
									
									// 网络错误时恢复原始状态
									rows.forEach(row => {
										const statusCell = row.querySelector('.status-cell');
										if (statusCell && originalStatuses[row.dataset.key]) {
											statusCell.textContent = originalStatuses[row.dataset.key].text;
											statusCell.className = originalStatuses[row.dataset.key].className;
										}
									});
								} finally {
									// 重新启用检查按钮
									checkKeysBtn.disabled = false;
									checkKeysBtn.textContent = '检查密钥状态';
								}
							});

										selectInvalidKeysBtn.addEventListener('click', () => {
											const rows = keysTableBody.querySelectorAll('tr');
											rows.forEach(row => {
												const statusCell = row.querySelector('.status-cell');
												if (statusCell && statusCell.textContent === '无效') {
													const checkbox = row.querySelector('.key-checkbox');
													if (checkbox) {
														checkbox.checked = true;
													}
												}
											});
											updateDeleteButtonVisibility();
										});

										addKeysForm.addEventListener('submit', async (e) => {
												e.preventDefault();
												const keys = apiKeysTextarea.value.split('\\n').map(k => k.trim()).filter(k => k !== '');
												if (keys.length === 0) {
												  alert('请输入至少一个API密钥。');
												  return;
												}
												try {
												  const response = await fetch('/api/keys', {
												    method: 'POST',
												    headers: { 'Content-Type': 'application/json' },
												    body: JSON.stringify({ keys }),
												  });
												  const result = await response.json();
												  if (response.ok) {
												    alert(result.message || '密钥添加成功。');
												    apiKeysTextarea.value = '';
												    fetchAndRenderKeys();
												  } else {
												    alert(\`添加密钥失败: \${result.error || '未知错误'}\`);
												  }
												} catch (error) {
												  alert('请求失败，请检查网络连接。');
												  console.error('Failed to add keys:', error);
												}
										});

										refreshKeysBtn.addEventListener('click', fetchAndRenderKeys);

										// 查看待删除密钥按钮事件
										viewPendingKeysBtn.addEventListener('click', async () => {
											try {
												const response = await fetch('/api/keys/pending');
												const result = await response.json();
												if (response.ok) {
													if (result.keys.length === 0) {
														alert('当前没有待删除的密钥。');
														return;
													}
													
													let message = '待删除密钥列表:\\n\\n';
													result.keys.forEach(key => {
														message += '密钥: ' + key.api_key.substring(0, 16) + '...\\n';
														message += '原因: ' + (key.pending_deletion_reason || '未知') + '\\n';
														message += '时间: ' + (key.pending_deletion_at ? new Date(key.pending_deletion_at).toLocaleString() : '未知') + '\\n';
														message += '失败次数: ' + key.failed_count + '\\n\\n';
													});
													
													alert(message);
												} else {
													alert('获取待删除密钥失败: ' + (result.error || '未知错误'));
												}
											} catch (error) {
												alert('请求失败，请检查网络连接。');
												console.error('Failed to fetch pending keys:', error);
											}
										});

										// 确认删除按钮事件
										confirmDeleteKeysBtn.addEventListener('click', async () => {
											try {
												const response = await fetch('/api/keys/pending');
												const result = await response.json();
												if (response.ok && result.keys.length > 0) {
													if (confirm('确定要删除所有待删除状态的密钥吗？此操作不可恢复。')) {
														const deleteResponse = await fetch('/api/keys/confirm-delete', {
															method: 'POST',
															headers: {
																'Content-Type': 'application/json'
															}
														});
														const deleteResult = await deleteResponse.json();
														if (deleteResponse.ok) {
															alert('成功删除 ' + deleteResult.deletedCount + ' 个密钥。');
															fetchAndRenderKeys();
														} else {
															alert('删除密钥失败: ' + (deleteResult.error || '未知错误'));
														}
													}
												} else {
													alert('当前没有待删除的密钥。');
												}
											} catch (error) {
												alert('请求失败，请检查网络连接。');
												console.error('Failed to confirm delete keys:', error);
											}
										});

										// 恢复密钥按钮事件
										restoreKeysBtn.addEventListener('click', async () => {
											try {
												const response = await fetch('/api/keys/pending');
												const result = await response.json();
												if (response.ok && result.keys.length > 0) {
													if (confirm('确定要恢复所有待删除状态的密钥吗？')) {
														const restoreResponse = await fetch('/api/keys/restore', {
															method: 'POST',
															headers: {
																'Content-Type': 'application/json'
															}
														});
														const restoreResult = await restoreResponse.json();
														if (restoreResponse.ok) {
															alert('成功恢复 ' + restoreResult.restoredCount + ' 个密钥。');
															fetchAndRenderKeys();
														} else {
															alert('恢复密钥失败: ' + (restoreResult.error || '未知错误'));
														}
													}
												} else {
													alert('当前没有待删除的密钥。');
												}
											} catch (error) {
												alert('请求失败，请检查网络连接。');
												console.error('Failed to restore keys:', error);
											}
										});

										prevPageBtn.addEventListener('click', () => {
												if (currentPage > 1) {
												  currentPage--;
												  fetchAndRenderKeys();
												}
										});

										nextPageBtn.addEventListener('click', () => {
												if (currentPage < totalPages) {
												  currentPage++;
												  fetchAndRenderKeys();
												}
										});

										// Initial load
										fetchAndRenderKeys();
								});
				  `,
					}}
				></script>
			</body>
		</html>
	);
};
