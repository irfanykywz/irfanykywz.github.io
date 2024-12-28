---
title: "Mentoring BMBC"
description: "ini bermula ketika mengikuti seminar"
date: 2017-03-25T16:00:35+07:00
draft: False
tags: []
---

<div id="resultDecrypt">

<p>
	Konten ini diproteksi karena saat awal perjanjian tidak boleh disebarluaskan, jadi hanya akan jadi cerita saya dan yang mengikutinya...
</p>

<form id="form_hash">
<input class="form-control mb-3" id="key" type="text" name="password" placeholder="Key" autofocus/>
<input class="w-100 btn btn-primary" type="submit" value="Unlock"/>
</form>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>

<script>
function hashFormatDecrypt(key, salt) {
    return CryptoJS.PBKDF2(key, salt, {
        keySize: 256 / 32,
        iterations: 1000
    }).toString();
}    

function decrypt(key, encryptedMsg) {
    var encryptedHMAC = encryptedMsg.substring(0, 64),
    encryptedHTML = encryptedMsg.substring(64),
    decryptedHMAC = CryptoJS.HmacSHA256(encryptedHTML, CryptoJS.SHA256(key).toString()).toString();

    if (decryptedHMAC !== encryptedHMAC) {
        return false;
    }

    return decryptMsg(encryptedHTML, key);
}    

function decryptMsg(encryptedMsg, key) {
    var iv = CryptoJS.enc.Hex.parse(encryptedMsg.substr(0, 32))
    var encrypted = encryptedMsg.substring(32);

    return CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    }).toString(CryptoJS.enc.Utf8);
}  

document.getElementById('form_hash').addEventListener('submit', function (e) {
    e.preventDefault();

    var keyInput = document.getElementById('key').value;
    var encryptedMsg = '4df75709f44b44335cdf9a9dc2e700b24e0d0c7819fa7c51a4023180080427d8668d835b9e3a0899aed958665260408cU2FsdGVkX1+QK/KvmSBrQ45aj222UDabcThWx+24x8MAft+S1CKgyLOKMiyOia4o/YuVnyBjXzD7UHi4uC4d6uPaaKP1dMoNeqRd0s8MaHKZNl01ztWXTsCa2PQfRdACklAkxNIcJXJuMNp5khxLnmA3TxwziIEExtCwsb5yZwT5SwEYOXQtUU99WtClBLWAT7cKzGBFQ0th//XN6alC/hSFIEUfgTBopqoH8TMItiTfw6Dak5lUY7elI5v08Zm5hWi9zPJnLSDA6x0r9ZQfOJgcE/37Fy7cIVmF1kBz6RRDIQgquMpHOpsOr8QvIyUhthVt01zAPuI9xiGgIvcmAGwO5T4sRsj5JTl4XTg5K2N2DJX9pQz+JnHyfosq++4WuWpNmI+FD4BBXgIro29m9KNm0lQ+TABohm5wmWB80jPn2J1Rht50ALiJl6Q4Z43w932kmBW+w8vBTl9AM88zpa4E1Q9NYPfCfIs0XSd9r+y5rZgFWf6IWqLsP1s/lb1MTZZ8pHcawZMFIfYwBXwlzZwfJrHwI4vJt/807ztefO6Xf/xGVD5HCx8gtKQNUZjCS5WZR+ReTy1iFjsflJQArrflxj0DfrDbPYt0N3bDMktp1ZJULcS3CLmoWjNLAaWuxkVW1+lv+FRcLGN30LzKuuJhh6rl7xR7e3rIB2w1/5TqwY3IP95jOpmhc8hVjjONXdxtlVnwgQLzk0MPo55Gz2wMszaXRm/mIhjLY6CvdjmvmVAEhkaG1yFUoeYUC7qKT92umnUhDnsRPjA5mKbW5q2tlhmx4ePbhjdc9nk4IlLbqNhyrqZCjwbBivJ7AaYM9Vv/3mrsRg8yWcScY8PU6Bn4SXflkIAEveRGeH1V7Cag469Iih794GVu217UeV26ySpqeoVxwuOH4gZsYeIET8UJfSp6KDRIh6mjfWmxrAo1kiwp09FeUN1TH0+2kwxu0NYXxHIn2E9GxX+5/qa9PPLx5UJEDqc8WuqFdqLjDvTARN4dIBV8BWz+9TYuq41b/sUHLHtcLsHvCFv2xNkvv6zsVeYoXQzQ9i+TiSU+/fCsesiCIh8MWa1Xq6P49KwSZ367LpizN3w1eSNZuV4sMTAMGqsNZBUjE0pOLUT2HsW5Q7qMMT84sD2jmJI7l8aICJKhTo8pVQe7Xi1xKlDURwR0l8oM5pU4uPpkyeEUPvYGacHy6o+AtWIwn2aaRxsRdq4JpuJlkLc39bMF5xB4lmRAK+Uq6qJurG/1RN7qIZI4t4iB58xeIHjwdSjVFEywXmm9OaBDAp7QV5kz2frkbWOhGzn8tkWW0KNYtpdF4YYBDufdYwsPBMNG1W4sCQSWjDeiVi7mekQXyqGCXSpCk0Mboeo7K6Feh+kqM9FewVVsKZjwz8YmmcMc9DW2UnQXGOV1dv8Ll1o4f2+3KRaXWKYM+Sid41Q8UqK55bgrgEZuqumihfdr9fVw612UUn/5S/3EReEy3uBXZ6uRppALbMYxl5i4OOEcbKGhG5fOFFRnfYTXwaT7eJPR0Pwcr2GoPzy8druSlG4rh5olpUvBR+avOVDuy4/0VG/LmsppuIa49VkIUHc3+kxg4rIl795kY82Qazc2brlknXzIAEW7ktJHJ/q37tVNTHRM1TiiPi8bK4KVexjxF4l6c8CskqV5QBzahXEbIRkmY918zl95vUu9KfgVreeIMVDt3pOtRcRVDuC/YxnnpTeAqws7xf5dXxGfg54g9M5yP5mVNgASqu/JdVM4dkteDXkshObGLug0nG5zKVRqYnmxqI+RiJSJRiHbUTyLjfJgB7syd4UWku5sJmoB2W12knHHssnx4iHVOsu4mc4rVE53EHsJiIHikQERg5JT0zaF3g80skYyi/cMMDOzK+AeO7WQtuv8PIoREACZLwf1+ik7+lC3XSkMng4LK9ZEikytXxxQW8PU5725nygGYhxxMzHEr7s61TXGbwi/P1gJ4C8VnbFzlY6+FiYdKE4G2ABTai/UyLJJGh4I7FktEaMQp89xZd0sEKlhHMflW/wKhUxVpm1cG5CzlNaQLAREM3ZA6b0SfRWeDLiKo0s/CYMBUJzKwTqdphPFete/jBjO0cQz/bnoocB3bbCLV9qaXSUvFezhcTL0gogE8gYcLXxPCgJt5cR8+V3Z3EJAU5vj+g8ooNsflxFt1a7k++GHM3FI/kVytT5vzCqO6bdFIVWIBKv1/WsBT3pyIHd40lNUtkcT4Lqci5dg3u5JXPlQgzjrxyjC9ybEWiNmCLny73719yU2z+FZ79WOL83i2JSMfg0jpIqMqBfrjPRqQa2C++K08q4yzSZfI3pMkU1EE0h9QkYaye/yUT+Z+eD+hoEFxZx+HbRyR9wWeaht0CJIiKGvMRAGMP7XKOgiumwvU+L1TlC1YCDvWlJinjvBe0gLmZ41A3sd4yp6x3lVX9a9RlnNTxYyWRECdEmvqSWSOoBODLJi92cnd/Wj9dlQhu4SH6mFA43QHJ0xh39rqQbPUOJlTN7n3rA0p+NvkpZTIwEtT9WUAgXTG6bDwMglpTswOdj2YisK11JVY8By3todlG4zOpQolfyqnSIF8d/7bvAmqSYjhw5SxuWGarkkd+LxTDMZpd+FU4kK6iZJLPYkhwABmBPlWj0h4yx9wkw7gWud3DqaKKo5PLbLW79wYbL4dYZK5gKwC5yIi3cZZlY7pymMeqixVl91B8kCtifJEc3WnOp9suzeIz6b5t9zA5jrnoikxAGkADkjROxf/U06VN9gCxwu+REiRzBkkt7I5d2NW0KhEykByOEB+Jomm2AgqF0adswrsEUSpWIm6c95YPyaVFGXlihuP8H/dK/TCdfqKgDjoQhPQZWBR2zI7RagzUaLojIqeuVzfesI4o9ZoBsEbGSfLhh3GPWktEjDmbkop49gFfXqDhdwMq1aybg8N9Do494LUgrRZhs0swj3HCW85IqXBJM9V/NAgvuVF6gH6y+d6hcVeoYgATJHYvKrkzf8GWkZkQgxqVqPn+2VYc9YgoXf9AivxD9uphuKQAi9QFDP2L889kSdzt9YwuH5on0Pb+qKbrLZt2HcjpDyGf4G2zQNGrEnq6KZPwh46MyXwtIos7DTex8GIZ+ZJOMsQfe5TaCCIJ3jdXdFPMGQQMaZEYRS6pMKzZweTv3Gc7T2Nll8HQZaggnPlM38fPonBtCqHI4wWfSjiKQ58IRGhrWEw7oAHl4iGd4b3xf7VysgBOvr2qvJc9EnZQbBpKvF9D8gu8XOdt3Ov8A/+wQ/mSmQGofswx1Pk6b1pVk/qiqUnVHGLYMk7m17oFvXuJTiSYfjTq1i2dtih8k7Q255sAEVujYKIWSMn3hfD9UalVQQzOxFI01/zCY5pFaglb53+/vVyaOsPqU8FjoyRP+OhIuphM1I1qI821dgaYk9CM4vGhGHE09FasFbpxLP7tJq7o4pz37Euxgp9dCryyXXlN6F5At2yKl9/YKIR7TwLosR+g84zqbszZ/BsEljRqX9jQlkua3WBjZWsHuIuEr1o8HbM6O0FQamjPtCnmt2CT3DlZ6JctfIfwyzhSybh/Rmr3sBc1TgUuanN3JXfZNQnAACcPZj4jz9WWtnCat4TBB2HAosDCEmtta3uHSulVLbNIwnCn3J/tmC8ASCbLsoB3Twp8lHrl7vGYKEH5twN+/MG20R65iJNzSnEVQWMtE8iWhnWF281tSl/XzS9j7HdJ7dLeV+UVckDoWYl6Bd9I+L41lPZRMPYquOpsu9kHcfqCNiFCtQFhBKfk24wlFggaHfqSGSFAaASn0tjUFpQ+xn12VSfho2D2fzzO+USb4JWg3U6Nev9eUaNsUbO+q7hyfI5JGcAHwlL2kRJOprHN6pVigzxLYd/krT/a2TKirBkoTEk81FtOcu6fJzWz+Uw0BbJrYrZkdvdY2bfUmXYVJ6QinbDk7IOqs+1yP7TidE3s6j3bQh6lRSAYNk/q12QlWCvL1iQNKzgRCSY2vrSKFStdLBGY6Mea/DsxJxm9LvUEHzDGGl1RIrnsxnWs00/gqAz+12+fkjAf0Q/ZX9mUwrTfzW+oZFW5LuRnp7xU6Ds3RmbBQPrhqvMxZ3/8bH4xScEayHVvFCxOlt896nxJeZzxqI1d06j2aUwkw6+vxyErYTfJHDuZUVSe3YGPT8cdQICQBXJnPJIWD0JIVfAhHWucZ2C0b0nNDKuv+sQh6fAKViMJJulXhTCjx4KqnCn6AxTHyqYyFM2JcqQBXqbvCvZj96bYSWfi28S9RG9xksSMlM3oduXv+3OzdAj8umDgSrKEovYLvAe9KVHAMSDazZO4vNoVCeyWbV6mxE5QRoTh5QFh8LjwEjPyuDSCO5cx+nZKMN6zINieSda6jlGdpYZQJOK+kRlyDUVzSw10ulGvKJ+VuC+y1JHeR0e9R5Y8IB2EOXPij6in2xOQ/ETqdZCHgf7ne7X08ZwJp0gw6bjdQmY5vsa8Nh8We5lI+wJ1zB0SnR5Z/WvvLosstWl3XiZATA5TDAGwxDnRkaLU6bFcHwSdUMAijWmpGOl842zEM9Rk3g/UQ4yVSLuBVy1xSKuEruj0s2Biv4j3jdnfTpx/pQWurovhVw6oWr9J5Fx2m0qIhe7tQ+nA37FZyQYq6kigOt2fC/70ltabnCCDfif5FSctHNh2VIyhpFeaC3Bo+elibfW1Jjc0zhkGIsf23Bz2XTEFRXnEc7DwWNDVc0KvL2OMa1J0ldhQwQVTCMQlTGeprAfgQQz6lbrF1IcYa7g/BdLtEzIScL3g2IeHPpmwnK6oU19WgYUcYP2oPA6iLAjmaqAg2swNMJnojRiGMiuAsGABBnz+APiBAYwYLrKvNBogSHaZIcmrk1d/Tx290aVmeJqPTAMuz0oZTqU5Tdq1bJYrkwROOJmL8oF4TNkH3tOjMh3YOYtIsBcvWEaz7O6ILf/a+RDEtUuN37TOnVytMBrB7hOE2V6Wlz0Hatsn1eU3iJ4pMxGAzSShhv8m3tt4bvVkLTXK7x1eHsikZ0lZvhXfsRUNBkYw/pO4CYZ/tQDIMq25TQ';
    var salt = 'a5b8c22842c08b519a43dc843415be96';

    var hashKeyDec = hashFormatDecrypt(keyInput, salt);
    var decryptMsg = decrypt(hashKeyDec, encryptedMsg);

    // console.info(decryptMsg);        

    if (!decryptMsg) {
        alert('wrong Key !');
    }else{                
        document.getElementById('resultDecrypt').innerHTML = decryptMsg;
    }
});       
</script>
