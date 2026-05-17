export const friendsPage = `
<div class="content page-layout">
<div class="page-toolbar">
<h2>友链管理</h2>
<button type="button" class="btn btn-primary" onclick="openFriendModal()">新建</button>
<input type="text" id="friendSearchFilter" placeholder="搜索友链..." oninput="filterFriends()">
</div>
<div class="page-cards-area">
<div class="card-grid" id="friendsCards"></div>
</div>
<div id="friendsStats" class="page-stats"></div>
</div>

<div class="modal" id="friendModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="friendModalTitle">新建</h2>
      <button class="close-btn" onclick="closeFriendModal()">&times;</button>
    </div>
    <form id="friendForm" class="form-group">
      <input type="hidden" name="id" id="friendId">
      <div class="form-grid">
        <div class="form-group"><label>标题</label><input type="text" name="title" id="friendTitle" required></div>
        <div class="form-group"><label>网站URL</label><input type="url" name="siteurl" id="friendSiteurl" placeholder="https://..." required></div>
        <div class="form-group"><label>图片URL</label><input type="url" name="imgurl" id="friendImgurl" placeholder="https://.../avatar.png"></div>
        <div class="form-group"><label>描述</label><input type="text" name="desc" id="friendDesc" placeholder="网站描述"></div>
        <div class="form-group"><label>标签</label><textarea name="tags" id="friendTags" placeholder="每行一个标签" rows="2"></textarea></div>
      </div>
      <button type="submit" class="btn btn-primary">保存友链</button>
      <button type="button" class="btn btn-success" onclick="clearFriendForm(); closeFriendModal()">取消</button>
    </form>
  </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.nav-link[data-page="friends"]')?.classList.add('active');
  loadFriends();
});
async function loadFriends() {
  const res = await api('GET', '/api/friends');
  const container = document.getElementById('friendsCards');
  
  if (!res.data || res.data.length === 0) {
    container.innerHTML = '<p class="empty-state">暂无友链数据</p>';
    document.getElementById('friendsStats').innerHTML = '';
    return;
  }
  
  window.friendsData = res.data;
  filterFriends();
}

function filterFriends() {
  var data = window.friendsData || [];
  var container = document.getElementById('friendsCards');
  var searchFilter = document.getElementById('friendSearchFilter').value.toLowerCase();
  
  var filtered = data.filter(function(f) {
    var matchSearch = !searchFilter || (f.title || '').toLowerCase().includes(searchFilter) || (f.desc || '').toLowerCase().includes(searchFilter);
    return matchSearch;
  });
  
  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state">没有符合条件的友链</p>';
  } else {
    container.innerHTML = '';
    filtered.forEach(function(f) {
      var desc = f.desc || '暂无描述';
      var tagsHtml = (f.tags||[]).map(function(t) { return '<span class="badge badge-success">' + t + '</span>'; }).join('');
      
      var card = document.createElement('div');
      card.className = 'card friend-card';
      
      var friendHeader = document.createElement('div');
      friendHeader.className = 'friend-header';
      
      if (f.imgurl) {
        var avatar = document.createElement('img');
        avatar.src = f.imgurl;
        avatar.alt = f.title;
        avatar.className = 'friend-avatar';
        avatar.onerror = function() { this.style.display = 'none'; };
        friendHeader.appendChild(avatar);
      }
      
      var title = document.createElement('h3');
      title.textContent = f.title;
      friendHeader.appendChild(title);
      card.appendChild(friendHeader);
      
      var friendDesc = document.createElement('p');
      friendDesc.className = 'friend-desc';
      friendDesc.textContent = desc;
      card.appendChild(friendDesc);
      
      var cardMeta = document.createElement('div');
      cardMeta.className = 'card-meta';
      
      var link = document.createElement('a');
      link.href = f.siteurl;
      link.target = '_blank';
      link.className = 'badge badge-info';
      link.textContent = '访问网站';
      cardMeta.appendChild(link);
      
      (f.tags || []).forEach(function(t) {
        var tagSpan = document.createElement('span');
        tagSpan.className = 'badge badge-success';
        tagSpan.textContent = t;
        cardMeta.appendChild(tagSpan);
      });
      card.appendChild(cardMeta);
      
      var cardActions = document.createElement('div');
      cardActions.className = 'card-actions';
      
      var editBtn = document.createElement('button');
      editBtn.className = 'btn btn-sm btn-primary';
      editBtn.textContent = '编辑';
      editBtn.addEventListener('click', function() { editFriend(f.id); });
      cardActions.appendChild(editBtn);
      
      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-sm btn-danger';
      deleteBtn.textContent = '删除';
      deleteBtn.addEventListener('click', function() { deleteFriend(f.id); });
      cardActions.appendChild(deleteBtn);
      
      card.appendChild(cardActions);
      
      container.appendChild(card);
    });
  }
  
  document.getElementById('friendsStats').innerHTML = '共 ' + filtered.length + ' 个友链' + (filtered.length !== data.length ? '（共 ' + data.length + ' 个）' : '');
}
document.getElementById('friendForm').addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    title: document.getElementById('friendTitle').value,
    siteurl: document.getElementById('friendSiteurl').value,
    imgurl: document.getElementById('friendImgurl').value,
    desc: document.getElementById('friendDesc').value,
    tags: document.getElementById('friendTags').value.split('\\n').map(t => t.trim()).filter(Boolean)
  };
  const id = document.getElementById('friendId').value;
  if (id) {
    await api('PUT', \`/api/friends/\${id}\`, data);
  } else {
    await api('POST', '/api/friends', data);
  }
  showMsg('保存成功', 'success');
  loadFriends();
  clearFriendForm();
  closeFriendModal();
});
function openFriendModal() {
  document.getElementById('friendModalTitle').textContent = '新建';
  clearFriendForm();
  document.getElementById('friendModal').classList.add('active');
}
function closeFriendModal() {
  document.getElementById('friendModal').classList.remove('active');
}
function clearFriendForm() {
  document.getElementById('friendId').value = '';
  document.getElementById('friendTitle').value = '';
  document.getElementById('friendSiteurl').value = '';
  document.getElementById('friendImgurl').value = '';
  document.getElementById('friendDesc').value = '';
  document.getElementById('friendTags').value = '';
}
async function editFriend(id) {
  const res = await api('GET', '/api/friends');
  const f = res.data.find(x => x.id === id);
  if (!f) return;
  document.getElementById('friendModalTitle').textContent = '编辑友链';
  document.getElementById('friendId').value = f.id;
  document.getElementById('friendTitle').value = f.title;
  document.getElementById('friendSiteurl').value = f.siteurl;
  document.getElementById('friendImgurl').value = f.imgurl || '';
  document.getElementById('friendDesc').value = f.desc || '';
  document.getElementById('friendTags').value = (f.tags||[]).join('\\n');
  document.getElementById('friendModal').classList.add('active');
}
async function deleteFriend(id) {
  showConfirmModal('确定要删除这条友链吗？', async function() {
    await api('DELETE', \`/api/friends/\${id}\`);
    showMsg('删除成功', 'success');
    loadFriends();
  });
}
document.getElementById('friendModal').addEventListener('click', e => {
  if (e.target === document.getElementById('friendModal')) {
    closeFriendModal();
  }
});
</script>`;