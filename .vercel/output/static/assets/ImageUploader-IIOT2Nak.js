import { a1 as qe, Q as st, D as ee, X as ft, a6 as Te } from "./index-C2UuTsl-.js";
import { L as lt, I as ct } from "./pencil-vgQ1QePa.js";
import { U as ut } from "./upload-CH3K2uMF.js";
function dt(M, R) {
  return (
    R.forEach(function (N) {
      N &&
        typeof N != "string" &&
        !Array.isArray(N) &&
        Object.keys(N).forEach(function (d) {
          if (d !== "default" && !(d in M)) {
            var e = Object.getOwnPropertyDescriptor(N, d);
            Object.defineProperty(
              M,
              d,
              e.get
                ? e
                : {
                    enumerable: !0,
                    get: function () {
                      return N[d];
                    },
                  },
            );
          }
        });
    }),
    Object.freeze(M)
  );
}
function Ke(M, R) {
  return new Promise(function (N, d) {
    let e;
    return ht(M).then(function (t) {
      try {
        return ((e = t), N(new Blob([R.slice(0, 2), e, R.slice(2)], { type: "image/jpeg" })));
      } catch (u) {
        return d(u);
      }
    }, d);
  });
}
const ht = (M) =>
  new Promise((R, N) => {
    const d = new FileReader();
    (d.addEventListener("load", ({ target: { result: e } }) => {
      const t = new DataView(e);
      let u = 0;
      if (t.getUint16(u) !== 65496) return N("not a valid JPEG");
      for (u += 2; ; ) {
        const a = t.getUint16(u);
        if (a === 65498) break;
        const p = t.getUint16(u + 2);
        if (a === 65505 && t.getUint32(u + 4) === 1165519206) {
          const b = u + 10;
          let n;
          switch (t.getUint16(b)) {
            case 18761:
              n = !0;
              break;
            case 19789:
              n = !1;
              break;
            default:
              return N("TIFF header contains invalid endian");
          }
          if (t.getUint16(b + 2, n) !== 42) return N("TIFF header contains invalid version");
          const i = t.getUint32(b + 4, n),
            r = b + i + 2 + 12 * t.getUint16(b + i, n);
          for (let s = b + i + 2; s < r; s += 12)
            if (t.getUint16(s, n) == 274) {
              if (t.getUint16(s + 2, n) !== 3) return N("Orientation data type is invalid");
              if (t.getUint32(s + 4, n) !== 1) return N("Orientation data count is invalid");
              t.setUint16(s + 8, 1, n);
              break;
            }
          return R(e.slice(u, u + 2 + p));
        }
        u += 2 + p;
      }
      return R(new Blob());
    }),
      d.readAsArrayBuffer(M));
  });
var ke = {},
  gt = {
    get exports() {
      return ke;
    },
    set exports(M) {
      ke = M;
    },
  };
(function (M) {
  var R,
    N,
    d = {};
  ((gt.exports = d),
    (d.parse = function (e, t) {
      for (
        var u = d.bin.readUshort,
          a = d.bin.readUint,
          p = 0,
          b = {},
          n = new Uint8Array(e),
          i = n.length - 4;
        a(n, i) != 101010256;
      )
        i--;
      ((p = i), (p += 4));
      var r = u(n, (p += 4));
      u(n, (p += 2));
      var s = a(n, (p += 2)),
        h = a(n, (p += 4));
      ((p += 4), (p = h));
      for (var U = 0; U < r; U++) {
        (a(n, p), (p += 4), (p += 4), (p += 4), a(n, (p += 4)), (s = a(n, (p += 4))));
        var I = a(n, (p += 4)),
          w = u(n, (p += 4)),
          D = u(n, p + 2),
          T = u(n, p + 4);
        p += 6;
        var _ = a(n, (p += 8));
        ((p += 4), (p += w + D + T), d._readLocal(n, _, b, s, I, t));
      }
      return b;
    }),
    (d._readLocal = function (e, t, u, a, p, b) {
      var n = d.bin.readUshort,
        i = d.bin.readUint;
      (i(e, t), n(e, (t += 4)), n(e, (t += 2)));
      var r = n(e, (t += 2));
      (i(e, (t += 2)), i(e, (t += 4)), (t += 4));
      var s = n(e, (t += 8)),
        h = n(e, (t += 2));
      t += 2;
      var U = d.bin.readUTF8(e, t, s);
      if (((t += s), (t += h), b)) u[U] = { size: p, csize: a };
      else {
        var I = new Uint8Array(e.buffer, t);
        if (r == 0) u[U] = new Uint8Array(I.buffer.slice(t, t + a));
        else {
          if (r != 8) throw "unknown compression method: " + r;
          var w = new Uint8Array(p);
          (d.inflateRaw(I, w), (u[U] = w));
        }
      }
    }),
    (d.inflateRaw = function (e, t) {
      return d.F.inflate(e, t);
    }),
    (d.inflate = function (e, t) {
      return (
        e[0],
        e[1],
        d.inflateRaw(new Uint8Array(e.buffer, e.byteOffset + 2, e.length - 6), t)
      );
    }),
    (d.deflate = function (e, t) {
      t == null && (t = { level: 6 });
      var u = 0,
        a = new Uint8Array(50 + Math.floor(1.1 * e.length));
      ((a[u] = 120), (a[u + 1] = 156), (u += 2), (u = d.F.deflateRaw(e, a, u, t.level)));
      var p = d.adler(e, 0, e.length);
      return (
        (a[u + 0] = (p >>> 24) & 255),
        (a[u + 1] = (p >>> 16) & 255),
        (a[u + 2] = (p >>> 8) & 255),
        (a[u + 3] = (p >>> 0) & 255),
        new Uint8Array(a.buffer, 0, u + 4)
      );
    }),
    (d.deflateRaw = function (e, t) {
      t == null && (t = { level: 6 });
      var u = new Uint8Array(50 + Math.floor(1.1 * e.length)),
        a = d.F.deflateRaw(e, u, a, t.level);
      return new Uint8Array(u.buffer, 0, a);
    }),
    (d.encode = function (e, t) {
      t == null && (t = !1);
      var u = 0,
        a = d.bin.writeUint,
        p = d.bin.writeUshort,
        b = {};
      for (var n in e) {
        var i = !d._noNeed(n) && !t,
          r = e[n],
          s = d.crc.crc(r, 0, r.length);
        b[n] = { cpr: i, usize: r.length, crc: s, file: i ? d.deflateRaw(r) : r };
      }
      for (var n in b) u += b[n].file.length + 30 + 46 + 2 * d.bin.sizeUTF8(n);
      u += 22;
      var h = new Uint8Array(u),
        U = 0,
        I = [];
      for (var n in b) {
        var w = b[n];
        (I.push(U), (U = d._writeHeader(h, U, n, w, 0)));
      }
      var D = 0,
        T = U;
      for (var n in b) ((w = b[n]), I.push(U), (U = d._writeHeader(h, U, n, w, 1, I[D++])));
      var _ = U - T;
      return (
        a(h, U, 101010256),
        (U += 4),
        p(h, (U += 4), D),
        p(h, (U += 2), D),
        a(h, (U += 2), _),
        a(h, (U += 4), T),
        (U += 4),
        (U += 2),
        h.buffer
      );
    }),
    (d._noNeed = function (e) {
      var t = e.split(".").pop().toLowerCase();
      return "png,jpg,jpeg,zip".indexOf(t) != -1;
    }),
    (d._writeHeader = function (e, t, u, a, p, b) {
      var n = d.bin.writeUint,
        i = d.bin.writeUshort,
        r = a.file;
      return (
        n(e, t, p == 0 ? 67324752 : 33639248),
        (t += 4),
        p == 1 && (t += 2),
        i(e, t, 20),
        i(e, (t += 2), 0),
        i(e, (t += 2), a.cpr ? 8 : 0),
        n(e, (t += 2), 0),
        n(e, (t += 4), a.crc),
        n(e, (t += 4), r.length),
        n(e, (t += 4), a.usize),
        i(e, (t += 4), d.bin.sizeUTF8(u)),
        i(e, (t += 2), 0),
        (t += 2),
        p == 1 && ((t += 2), (t += 2), n(e, (t += 6), b), (t += 4)),
        (t += d.bin.writeUTF8(e, t, u)),
        p == 0 && (e.set(r, t), (t += r.length)),
        t
      );
    }),
    (d.crc = {
      table: (function () {
        for (var e = new Uint32Array(256), t = 0; t < 256; t++) {
          for (var u = t, a = 0; a < 8; a++) 1 & u ? (u = 3988292384 ^ (u >>> 1)) : (u >>>= 1);
          e[t] = u;
        }
        return e;
      })(),
      update: function (e, t, u, a) {
        for (var p = 0; p < a; p++) e = d.crc.table[255 & (e ^ t[u + p])] ^ (e >>> 8);
        return e;
      },
      crc: function (e, t, u) {
        return 4294967295 ^ d.crc.update(4294967295, e, t, u);
      },
    }),
    (d.adler = function (e, t, u) {
      for (var a = 1, p = 0, b = t, n = t + u; b < n; ) {
        for (var i = Math.min(b + 5552, n); b < i; ) p += a += e[b++];
        ((a %= 65521), (p %= 65521));
      }
      return (p << 16) | a;
    }),
    (d.bin = {
      readUshort: function (e, t) {
        return e[t] | (e[t + 1] << 8);
      },
      writeUshort: function (e, t, u) {
        ((e[t] = 255 & u), (e[t + 1] = (u >> 8) & 255));
      },
      readUint: function (e, t) {
        return 16777216 * e[t + 3] + ((e[t + 2] << 16) | (e[t + 1] << 8) | e[t]);
      },
      writeUint: function (e, t, u) {
        ((e[t] = 255 & u),
          (e[t + 1] = (u >> 8) & 255),
          (e[t + 2] = (u >> 16) & 255),
          (e[t + 3] = (u >> 24) & 255));
      },
      readASCII: function (e, t, u) {
        for (var a = "", p = 0; p < u; p++) a += String.fromCharCode(e[t + p]);
        return a;
      },
      writeASCII: function (e, t, u) {
        for (var a = 0; a < u.length; a++) e[t + a] = u.charCodeAt(a);
      },
      pad: function (e) {
        return e.length < 2 ? "0" + e : e;
      },
      readUTF8: function (e, t, u) {
        for (var a, p = "", b = 0; b < u; b++) p += "%" + d.bin.pad(e[t + b].toString(16));
        try {
          a = decodeURIComponent(p);
        } catch {
          return d.bin.readASCII(e, t, u);
        }
        return a;
      },
      writeUTF8: function (e, t, u) {
        for (var a = u.length, p = 0, b = 0; b < a; b++) {
          var n = u.charCodeAt(b);
          if ((4294967168 & n) == 0) ((e[t + p] = n), p++);
          else if ((4294965248 & n) == 0)
            ((e[t + p] = 192 | (n >> 6)), (e[t + p + 1] = 128 | ((n >> 0) & 63)), (p += 2));
          else if ((4294901760 & n) == 0)
            ((e[t + p] = 224 | (n >> 12)),
              (e[t + p + 1] = 128 | ((n >> 6) & 63)),
              (e[t + p + 2] = 128 | ((n >> 0) & 63)),
              (p += 3));
          else {
            if ((4292870144 & n) != 0) throw "e";
            ((e[t + p] = 240 | (n >> 18)),
              (e[t + p + 1] = 128 | ((n >> 12) & 63)),
              (e[t + p + 2] = 128 | ((n >> 6) & 63)),
              (e[t + p + 3] = 128 | ((n >> 0) & 63)),
              (p += 4));
          }
        }
        return p;
      },
      sizeUTF8: function (e) {
        for (var t = e.length, u = 0, a = 0; a < t; a++) {
          var p = e.charCodeAt(a);
          if ((4294967168 & p) == 0) u++;
          else if ((4294965248 & p) == 0) u += 2;
          else if ((4294901760 & p) == 0) u += 3;
          else {
            if ((4292870144 & p) != 0) throw "e";
            u += 4;
          }
        }
        return u;
      },
    }),
    (d.F = {}),
    (d.F.deflateRaw = function (e, t, u, a) {
      var p = [
          [0, 0, 0, 0, 0],
          [4, 4, 8, 4, 0],
          [4, 5, 16, 8, 0],
          [4, 6, 16, 16, 0],
          [4, 10, 16, 32, 0],
          [8, 16, 32, 32, 0],
          [8, 16, 128, 128, 0],
          [8, 32, 128, 256, 0],
          [32, 128, 258, 1024, 1],
          [32, 258, 258, 4096, 1],
        ][a],
        b = d.F.U,
        n = d.F._goodIndex;
      d.F._hash;
      var i = d.F._putsE,
        r = 0,
        s = u << 3,
        h = 0,
        U = e.length;
      if (a == 0) {
        for (; r < U; )
          (i(t, s, r + (y = Math.min(65535, U - r)) == U ? 1 : 0),
            (s = d.F._copyExact(e, r, y, t, s + 8)),
            (r += y));
        return s >>> 3;
      }
      var I = b.lits,
        w = b.strt,
        D = b.prev,
        T = 0,
        _ = 0,
        O = 0,
        g = 0,
        S = 0,
        l = 0;
      for (U > 2 && (w[(l = d.F._hash(e, 0))] = 0), r = 0; r < U; r++) {
        if (((S = l), r + 1 < U - 2)) {
          l = d.F._hash(e, r + 1);
          var f = (r + 1) & 32767;
          ((D[f] = w[l]), (w[l] = f));
        }
        if (h <= r) {
          (T > 14e3 || _ > 26697) &&
            U - r > 100 &&
            (h < r && ((I[T] = r - h), (T += 2), (h = r)),
            (s = d.F._writeBlock(r == U - 1 || h == U ? 1 : 0, I, T, g, e, O, r - O, t, s)),
            (T = _ = g = 0),
            (O = r));
          var v = 0;
          r < U - 2 && (v = d.F._bestMatch(e, r, D, S, Math.min(p[2], U - r), p[3]));
          var y = v >>> 16,
            A = 65535 & v;
          if (v != 0) {
            A = 65535 & v;
            var x = n((y = v >>> 16), b.of0);
            b.lhst[257 + x]++;
            var m = n(A, b.df0);
            (b.dhst[m]++,
              (g += b.exb[x] + b.dxb[m]),
              (I[T] = (y << 23) | (r - h)),
              (I[T + 1] = (A << 16) | (x << 8) | m),
              (T += 2),
              (h = r + y));
          } else b.lhst[e[r]]++;
          _++;
        }
      }
      for (
        (O == r && e.length != 0) ||
        (h < r && ((I[T] = r - h), (T += 2), (h = r)),
        (s = d.F._writeBlock(1, I, T, g, e, O, r - O, t, s)),
        (T = 0),
        (_ = 0),
        (T = _ = g = 0),
        (O = r));
        (7 & s) != 0;
      )
        s++;
      return s >>> 3;
    }),
    (d.F._bestMatch = function (e, t, u, a, p, b) {
      var n = 32767 & t,
        i = u[n],
        r = (n - i + 32768) & 32767;
      if (i == n || a != d.F._hash(e, t - r)) return 0;
      for (var s = 0, h = 0, U = Math.min(32767, t); r <= U && --b != 0 && i != n; ) {
        if (s == 0 || e[t + s] == e[t + s - r]) {
          var I = d.F._howLong(e, t, r);
          if (I > s) {
            if (((h = r), (s = I) >= p)) break;
            r + 2 < I && (I = r + 2);
            for (var w = 0, D = 0; D < I - 2; D++) {
              var T = (t - r + D + 32768) & 32767,
                _ = (T - u[T] + 32768) & 32767;
              _ > w && ((w = _), (i = T));
            }
          }
        }
        r += ((n = i) - (i = u[n]) + 32768) & 32767;
      }
      return (s << 16) | h;
    }),
    (d.F._howLong = function (e, t, u) {
      if (e[t] != e[t - u] || e[t + 1] != e[t + 1 - u] || e[t + 2] != e[t + 2 - u]) return 0;
      var a = t,
        p = Math.min(e.length, t + 258);
      for (t += 3; t < p && e[t] == e[t - u]; ) t++;
      return t - a;
    }),
    (d.F._hash = function (e, t) {
      return (((e[t] << 8) | e[t + 1]) + (e[t + 2] << 4)) & 65535;
    }),
    (d.saved = 0),
    (d.F._writeBlock = function (e, t, u, a, p, b, n, i, r) {
      var s,
        h,
        U,
        I,
        w,
        D,
        T,
        _,
        O,
        g = d.F.U,
        S = d.F._putsF,
        l = d.F._putsE;
      (g.lhst[256]++,
        (h = (s = d.F.getTrees())[0]),
        (U = s[1]),
        (I = s[2]),
        (w = s[3]),
        (D = s[4]),
        (T = s[5]),
        (_ = s[6]),
        (O = s[7]));
      var f = 32 + (((r + 3) & 7) == 0 ? 0 : 8 - ((r + 3) & 7)) + (n << 3),
        v = a + d.F.contSize(g.fltree, g.lhst) + d.F.contSize(g.fdtree, g.dhst),
        y = a + d.F.contSize(g.ltree, g.lhst) + d.F.contSize(g.dtree, g.dhst);
      y +=
        14 +
        3 * T +
        d.F.contSize(g.itree, g.ihst) +
        (2 * g.ihst[16] + 3 * g.ihst[17] + 7 * g.ihst[18]);
      for (var A = 0; A < 286; A++) g.lhst[A] = 0;
      for (A = 0; A < 30; A++) g.dhst[A] = 0;
      for (A = 0; A < 19; A++) g.ihst[A] = 0;
      var x = f < v && f < y ? 0 : v < y ? 1 : 2;
      if ((S(i, r, e), S(i, r + 1, x), (r += 3), x == 0)) {
        for (; (7 & r) != 0; ) r++;
        r = d.F._copyExact(p, b, n, i, r);
      } else {
        var m, E;
        if ((x == 1 && ((m = g.fltree), (E = g.fdtree)), x == 2)) {
          (d.F.makeCodes(g.ltree, h),
            d.F.revCodes(g.ltree, h),
            d.F.makeCodes(g.dtree, U),
            d.F.revCodes(g.dtree, U),
            d.F.makeCodes(g.itree, I),
            d.F.revCodes(g.itree, I),
            (m = g.ltree),
            (E = g.dtree),
            l(i, r, w - 257),
            l(i, (r += 5), D - 1),
            l(i, (r += 5), T - 4),
            (r += 4));
          for (var c = 0; c < T; c++) l(i, r + 3 * c, g.itree[1 + (g.ordr[c] << 1)]);
          ((r += 3 * T),
            (r = d.F._codeTiny(_, g.itree, i, r)),
            (r = d.F._codeTiny(O, g.itree, i, r)));
        }
        for (var o = b, P = 0; P < u; P += 2) {
          for (var F = t[P], k = F >>> 23, B = o + (8388607 & F); o < B; )
            r = d.F._writeLit(p[o++], m, i, r);
          if (k != 0) {
            var L = t[P + 1],
              j = L >> 16,
              H = (L >> 8) & 255,
              C = 255 & L;
            (l(i, (r = d.F._writeLit(257 + H, m, i, r)), k - g.of0[H]),
              (r += g.exb[H]),
              S(i, (r = d.F._writeLit(C, E, i, r)), j - g.df0[C]),
              (r += g.dxb[C]),
              (o += k));
          }
        }
        r = d.F._writeLit(256, m, i, r);
      }
      return r;
    }),
    (d.F._copyExact = function (e, t, u, a, p) {
      var b = p >>> 3;
      return (
        (a[b] = u),
        (a[b + 1] = u >>> 8),
        (a[b + 2] = 255 - a[b]),
        (a[b + 3] = 255 - a[b + 1]),
        (b += 4),
        a.set(new Uint8Array(e.buffer, t, u), b),
        p + ((u + 4) << 3)
      );
    }),
    (d.F.getTrees = function () {
      for (
        var e = d.F.U,
          t = d.F._hufTree(e.lhst, e.ltree, 15),
          u = d.F._hufTree(e.dhst, e.dtree, 15),
          a = [],
          p = d.F._lenCodes(e.ltree, a),
          b = [],
          n = d.F._lenCodes(e.dtree, b),
          i = 0;
        i < a.length;
        i += 2
      )
        e.ihst[a[i]]++;
      for (i = 0; i < b.length; i += 2) e.ihst[b[i]]++;
      for (
        var r = d.F._hufTree(e.ihst, e.itree, 7), s = 19;
        s > 4 && e.itree[1 + (e.ordr[s - 1] << 1)] == 0;
      )
        s--;
      return [t, u, r, p, n, s, a, b];
    }),
    (d.F.getSecond = function (e) {
      for (var t = [], u = 0; u < e.length; u += 2) t.push(e[u + 1]);
      return t;
    }),
    (d.F.nonZero = function (e) {
      for (var t = "", u = 0; u < e.length; u += 2) e[u + 1] != 0 && (t += (u >> 1) + ",");
      return t;
    }),
    (d.F.contSize = function (e, t) {
      for (var u = 0, a = 0; a < t.length; a++) u += t[a] * e[1 + (a << 1)];
      return u;
    }),
    (d.F._codeTiny = function (e, t, u, a) {
      for (var p = 0; p < e.length; p += 2) {
        var b = e[p],
          n = e[p + 1];
        a = d.F._writeLit(b, t, u, a);
        var i = b == 16 ? 2 : b == 17 ? 3 : 7;
        b > 15 && (d.F._putsE(u, a, n, i), (a += i));
      }
      return a;
    }),
    (d.F._lenCodes = function (e, t) {
      for (var u = e.length; u != 2 && e[u - 1] == 0; ) u -= 2;
      for (var a = 0; a < u; a += 2) {
        var p = e[a + 1],
          b = a + 3 < u ? e[a + 3] : -1,
          n = a + 5 < u ? e[a + 5] : -1,
          i = a == 0 ? -1 : e[a - 1];
        if (p == 0 && b == p && n == p) {
          for (var r = a + 5; r + 2 < u && e[r + 2] == p; ) r += 2;
          ((s = Math.min((r + 1 - a) >>> 1, 138)) < 11 ? t.push(17, s - 3) : t.push(18, s - 11),
            (a += 2 * s - 2));
        } else if (p == i && b == p && n == p) {
          for (r = a + 5; r + 2 < u && e[r + 2] == p; ) r += 2;
          var s = Math.min((r + 1 - a) >>> 1, 6);
          (t.push(16, s - 3), (a += 2 * s - 2));
        } else t.push(p, 0);
      }
      return u >>> 1;
    }),
    (d.F._hufTree = function (e, t, u) {
      var a = [],
        p = e.length,
        b = t.length,
        n = 0;
      for (n = 0; n < b; n += 2) ((t[n] = 0), (t[n + 1] = 0));
      for (n = 0; n < p; n++) e[n] != 0 && a.push({ lit: n, f: e[n] });
      var i = a.length,
        r = a.slice(0);
      if (i == 0) return 0;
      if (i == 1) {
        var s = a[0].lit;
        return ((r = s == 0 ? 1 : 0), (t[1 + (s << 1)] = 1), (t[1 + (r << 1)] = 1), 1);
      }
      a.sort(function (_, O) {
        return _.f - O.f;
      });
      var h = a[0],
        U = a[1],
        I = 0,
        w = 1,
        D = 2;
      for (a[0] = { lit: -1, f: h.f + U.f, l: h, r: U, d: 0 }; w != i - 1; )
        ((h = I != w && (D == i || a[I].f < a[D].f) ? a[I++] : a[D++]),
          (U = I != w && (D == i || a[I].f < a[D].f) ? a[I++] : a[D++]),
          (a[w++] = { lit: -1, f: h.f + U.f, l: h, r: U }));
      var T = d.F.setDepth(a[w - 1], 0);
      for (T > u && (d.F.restrictDepth(r, u, T), (T = u)), n = 0; n < i; n++)
        t[1 + (r[n].lit << 1)] = r[n].d;
      return T;
    }),
    (d.F.setDepth = function (e, t) {
      return e.lit != -1
        ? ((e.d = t), t)
        : Math.max(d.F.setDepth(e.l, t + 1), d.F.setDepth(e.r, t + 1));
    }),
    (d.F.restrictDepth = function (e, t, u) {
      var a = 0,
        p = 1 << (u - t),
        b = 0;
      for (
        e.sort(function (i, r) {
          return r.d == i.d ? i.f - r.f : r.d - i.d;
        }),
          a = 0;
        a < e.length && e[a].d > t;
        a++
      ) {
        var n = e[a].d;
        ((e[a].d = t), (b += p - (1 << (u - n))));
      }
      for (b >>>= u - t; b > 0; ) (n = e[a].d) < t ? (e[a].d++, (b -= 1 << (t - n - 1))) : a++;
      for (; a >= 0; a--) e[a].d == t && b < 0 && (e[a].d--, b++);
      b != 0 && console.log("debt left");
    }),
    (d.F._goodIndex = function (e, t) {
      var u = 0;
      return (
        t[16 | u] <= e && (u |= 16),
        t[8 | u] <= e && (u |= 8),
        t[4 | u] <= e && (u |= 4),
        t[2 | u] <= e && (u |= 2),
        t[1 | u] <= e && (u |= 1),
        u
      );
    }),
    (d.F._writeLit = function (e, t, u, a) {
      return (d.F._putsF(u, a, t[e << 1]), a + t[1 + (e << 1)]);
    }),
    (d.F.inflate = function (e, t) {
      var u = Uint8Array;
      if (e[0] == 3 && e[1] == 0) return t || new u(0);
      var a = d.F,
        p = a._bitsF,
        b = a._bitsE,
        n = a._decodeTiny,
        i = a.makeCodes,
        r = a.codes2map,
        s = a._get17,
        h = a.U,
        U = t == null;
      U && (t = new u((e.length >>> 2) << 3));
      for (var I, w, D = 0, T = 0, _ = 0, O = 0, g = 0, S = 0, l = 0, f = 0, v = 0; D == 0; )
        if (((D = p(e, v, 1)), (T = p(e, v + 1, 2)), (v += 3), T != 0)) {
          if (
            (U && (t = d.F._check(t, f + (1 << 17))),
            T == 1 && ((I = h.flmap), (w = h.fdmap), (S = 511), (l = 31)),
            T == 2)
          ) {
            ((_ = b(e, v, 5) + 257),
              (O = b(e, v + 5, 5) + 1),
              (g = b(e, v + 10, 4) + 4),
              (v += 14));
            for (var y = 0; y < 38; y += 2) ((h.itree[y] = 0), (h.itree[y + 1] = 0));
            var A = 1;
            for (y = 0; y < g; y++) {
              var x = b(e, v + 3 * y, 3);
              ((h.itree[1 + (h.ordr[y] << 1)] = x), x > A && (A = x));
            }
            ((v += 3 * g),
              i(h.itree, A),
              r(h.itree, A, h.imap),
              (I = h.lmap),
              (w = h.dmap),
              (v = n(h.imap, (1 << A) - 1, _ + O, e, v, h.ttree)));
            var m = a._copyOut(h.ttree, 0, _, h.ltree);
            S = (1 << m) - 1;
            var E = a._copyOut(h.ttree, _, O, h.dtree);
            ((l = (1 << E) - 1), i(h.ltree, m), r(h.ltree, m, I), i(h.dtree, E), r(h.dtree, E, w));
          }
          for (;;) {
            var c = I[s(e, v) & S];
            v += 15 & c;
            var o = c >>> 4;
            if (!(o >>> 8)) t[f++] = o;
            else {
              if (o == 256) break;
              var P = f + o - 254;
              if (o > 264) {
                var F = h.ldef[o - 257];
                ((P = f + (F >>> 3) + b(e, v, 7 & F)), (v += 7 & F));
              }
              var k = w[s(e, v) & l];
              v += 15 & k;
              var B = k >>> 4,
                L = h.ddef[B],
                j = (L >>> 4) + p(e, v, 15 & L);
              for (v += 15 & L, U && (t = d.F._check(t, f + (1 << 17))); f < P; )
                ((t[f] = t[f++ - j]),
                  (t[f] = t[f++ - j]),
                  (t[f] = t[f++ - j]),
                  (t[f] = t[f++ - j]));
              f = P;
            }
          }
        } else {
          (7 & v) != 0 && (v += 8 - (7 & v));
          var H = 4 + (v >>> 3),
            C = e[H - 4] | (e[H - 3] << 8);
          (U && (t = d.F._check(t, f + C)),
            t.set(new u(e.buffer, e.byteOffset + H, C), f),
            (v = (H + C) << 3),
            (f += C));
        }
      return t.length == f ? t : t.slice(0, f);
    }),
    (d.F._check = function (e, t) {
      var u = e.length;
      if (t <= u) return e;
      var a = new Uint8Array(Math.max(u << 1, t));
      return (a.set(e, 0), a);
    }),
    (d.F._decodeTiny = function (e, t, u, a, p, b) {
      for (var n = d.F._bitsE, i = d.F._get17, r = 0; r < u; ) {
        var s = e[i(a, p) & t];
        p += 15 & s;
        var h = s >>> 4;
        if (h <= 15) ((b[r] = h), r++);
        else {
          var U = 0,
            I = 0;
          h == 16
            ? ((I = 3 + n(a, p, 2)), (p += 2), (U = b[r - 1]))
            : h == 17
              ? ((I = 3 + n(a, p, 3)), (p += 3))
              : h == 18 && ((I = 11 + n(a, p, 7)), (p += 7));
          for (var w = r + I; r < w; ) ((b[r] = U), r++);
        }
      }
      return p;
    }),
    (d.F._copyOut = function (e, t, u, a) {
      for (var p = 0, b = 0, n = a.length >>> 1; b < u; ) {
        var i = e[b + t];
        ((a[b << 1] = 0), (a[1 + (b << 1)] = i), i > p && (p = i), b++);
      }
      for (; b < n; ) ((a[b << 1] = 0), (a[1 + (b << 1)] = 0), b++);
      return p;
    }),
    (d.F.makeCodes = function (e, t) {
      for (var u, a, p, b, n = d.F.U, i = e.length, r = n.bl_count, s = 0; s <= t; s++) r[s] = 0;
      for (s = 1; s < i; s += 2) r[e[s]]++;
      var h = n.next_code;
      for (u = 0, r[0] = 0, a = 1; a <= t; a++) ((u = (u + r[a - 1]) << 1), (h[a] = u));
      for (p = 0; p < i; p += 2) (b = e[p + 1]) != 0 && ((e[p] = h[b]), h[b]++);
    }),
    (d.F.codes2map = function (e, t, u) {
      for (var a = e.length, p = d.F.U.rev15, b = 0; b < a; b += 2)
        if (e[b + 1] != 0)
          for (
            var n = b >> 1,
              i = e[b + 1],
              r = (n << 4) | i,
              s = t - i,
              h = e[b] << s,
              U = h + (1 << s);
            h != U;
          )
            ((u[p[h] >>> (15 - t)] = r), h++);
    }),
    (d.F.revCodes = function (e, t) {
      for (var u = d.F.U.rev15, a = 15 - t, p = 0; p < e.length; p += 2) {
        var b = e[p] << (t - e[p + 1]);
        e[p] = u[b] >>> a;
      }
    }),
    (d.F._putsE = function (e, t, u) {
      u <<= 7 & t;
      var a = t >>> 3;
      ((e[a] |= u), (e[a + 1] |= u >>> 8));
    }),
    (d.F._putsF = function (e, t, u) {
      u <<= 7 & t;
      var a = t >>> 3;
      ((e[a] |= u), (e[a + 1] |= u >>> 8), (e[a + 2] |= u >>> 16));
    }),
    (d.F._bitsE = function (e, t, u) {
      return ((e[t >>> 3] | (e[1 + (t >>> 3)] << 8)) >>> (7 & t)) & ((1 << u) - 1);
    }),
    (d.F._bitsF = function (e, t, u) {
      return (
        ((e[t >>> 3] | (e[1 + (t >>> 3)] << 8) | (e[2 + (t >>> 3)] << 16)) >>> (7 & t)) &
        ((1 << u) - 1)
      );
    }),
    (d.F._get17 = function (e, t) {
      return (e[t >>> 3] | (e[1 + (t >>> 3)] << 8) | (e[2 + (t >>> 3)] << 16)) >>> (7 & t);
    }),
    (d.F._get25 = function (e, t) {
      return (
        (e[t >>> 3] |
          (e[1 + (t >>> 3)] << 8) |
          (e[2 + (t >>> 3)] << 16) |
          (e[3 + (t >>> 3)] << 24)) >>>
        (7 & t)
      );
    }),
    (d.F.U =
      ((R = Uint16Array),
      (N = Uint32Array),
      {
        next_code: new R(16),
        bl_count: new R(16),
        ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        of0: [
          3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115,
          131, 163, 195, 227, 258, 999, 999, 999,
        ],
        exb: [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0,
          0, 0,
        ],
        ldef: new R(32),
        df0: [
          1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537,
          2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535,
        ],
        dxb: [
          0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12,
          13, 13, 0, 0,
        ],
        ddef: new N(32),
        flmap: new R(512),
        fltree: [],
        fdmap: new R(32),
        fdtree: [],
        lmap: new R(32768),
        ltree: [],
        ttree: [],
        dmap: new R(32768),
        dtree: [],
        imap: new R(512),
        itree: [],
        rev15: new R(32768),
        lhst: new N(286),
        dhst: new N(30),
        ihst: new N(19),
        lits: new N(15e3),
        strt: new R(65536),
        prev: new R(32768),
      })),
    (function () {
      for (var e = d.F.U, t = 0; t < 32768; t++) {
        var u = t;
        ((u =
          ((4278255360 &
            (u =
              ((4042322160 &
                (u =
                  ((3435973836 & (u = ((2863311530 & u) >>> 1) | ((1431655765 & u) << 1))) >>> 2) |
                  ((858993459 & u) << 2))) >>>
                4) |
              ((252645135 & u) << 4))) >>>
            8) |
          ((16711935 & u) << 8)),
          (e.rev15[t] = ((u >>> 16) | (u << 16)) >>> 17));
      }
      function a(p, b, n) {
        for (; b-- != 0; ) p.push(0, n);
      }
      for (t = 0; t < 32; t++)
        ((e.ldef[t] = (e.of0[t] << 3) | e.exb[t]), (e.ddef[t] = (e.df0[t] << 4) | e.dxb[t]));
      (a(e.fltree, 144, 8),
        a(e.fltree, 112, 9),
        a(e.fltree, 24, 7),
        a(e.fltree, 8, 8),
        d.F.makeCodes(e.fltree, 9),
        d.F.codes2map(e.fltree, 9, e.flmap),
        d.F.revCodes(e.fltree, 9),
        a(e.fdtree, 32, 5),
        d.F.makeCodes(e.fdtree, 5),
        d.F.codes2map(e.fdtree, 5, e.fdmap),
        d.F.revCodes(e.fdtree, 5),
        a(e.itree, 19, 0),
        a(e.ltree, 286, 0),
        a(e.dtree, 30, 0),
        a(e.ttree, 320, 0));
    })());
})();
var pt = dt({ __proto__: null, default: ke }, [ke]);
const he = (function () {
  var M = {
    nextZero(n, i) {
      for (; n[i] != 0; ) i++;
      return i;
    },
    readUshort: (n, i) => (n[i] << 8) | n[i + 1],
    writeUshort(n, i, r) {
      ((n[i] = (r >> 8) & 255), (n[i + 1] = 255 & r));
    },
    readUint: (n, i) => 16777216 * n[i] + ((n[i + 1] << 16) | (n[i + 2] << 8) | n[i + 3]),
    writeUint(n, i, r) {
      ((n[i] = (r >> 24) & 255),
        (n[i + 1] = (r >> 16) & 255),
        (n[i + 2] = (r >> 8) & 255),
        (n[i + 3] = 255 & r));
    },
    readASCII(n, i, r) {
      let s = "";
      for (let h = 0; h < r; h++) s += String.fromCharCode(n[i + h]);
      return s;
    },
    writeASCII(n, i, r) {
      for (let s = 0; s < r.length; s++) n[i + s] = r.charCodeAt(s);
    },
    readBytes(n, i, r) {
      const s = [];
      for (let h = 0; h < r; h++) s.push(n[i + h]);
      return s;
    },
    pad: (n) => (n.length < 2 ? `0${n}` : n),
    readUTF8(n, i, r) {
      let s,
        h = "";
      for (let U = 0; U < r; U++) h += `%${M.pad(n[i + U].toString(16))}`;
      try {
        s = decodeURIComponent(h);
      } catch {
        return M.readASCII(n, i, r);
      }
      return s;
    },
  };
  function R(n, i, r, s) {
    const h = i * r,
      U = t(s),
      I = Math.ceil((i * U) / 8),
      w = new Uint8Array(4 * h),
      D = new Uint32Array(w.buffer),
      { ctype: T } = s,
      { depth: _ } = s,
      O = M.readUshort;
    if (T == 6) {
      const F = h << 2;
      if (_ == 8)
        for (var g = 0; g < F; g += 4)
          ((w[g] = n[g]), (w[g + 1] = n[g + 1]), (w[g + 2] = n[g + 2]), (w[g + 3] = n[g + 3]));
      if (_ == 16) for (g = 0; g < F; g++) w[g] = n[g << 1];
    } else if (T == 2) {
      const F = s.tabs.tRNS;
      if (F == null) {
        if (_ == 8)
          for (g = 0; g < h; g++) {
            var S = 3 * g;
            D[g] = (255 << 24) | (n[S + 2] << 16) | (n[S + 1] << 8) | n[S];
          }
        if (_ == 16)
          for (g = 0; g < h; g++)
            ((S = 6 * g), (D[g] = (255 << 24) | (n[S + 4] << 16) | (n[S + 2] << 8) | n[S]));
      } else {
        var l = F[0];
        const k = F[1],
          B = F[2];
        if (_ == 8)
          for (g = 0; g < h; g++) {
            var f = g << 2;
            ((S = 3 * g),
              (D[g] = (255 << 24) | (n[S + 2] << 16) | (n[S + 1] << 8) | n[S]),
              n[S] == l && n[S + 1] == k && n[S + 2] == B && (w[f + 3] = 0));
          }
        if (_ == 16)
          for (g = 0; g < h; g++)
            ((f = g << 2),
              (S = 6 * g),
              (D[g] = (255 << 24) | (n[S + 4] << 16) | (n[S + 2] << 8) | n[S]),
              O(n, S) == l && O(n, S + 2) == k && O(n, S + 4) == B && (w[f + 3] = 0));
      }
    } else if (T == 3) {
      const F = s.tabs.PLTE,
        k = s.tabs.tRNS,
        B = k ? k.length : 0;
      if (_ == 1)
        for (var v = 0; v < r; v++) {
          var y = v * I,
            A = v * i;
          for (g = 0; g < i; g++) {
            f = (A + g) << 2;
            var x = 3 * (m = (n[y + (g >> 3)] >> (7 - ((7 & g) << 0))) & 1);
            ((w[f] = F[x]),
              (w[f + 1] = F[x + 1]),
              (w[f + 2] = F[x + 2]),
              (w[f + 3] = m < B ? k[m] : 255));
          }
        }
      if (_ == 2)
        for (v = 0; v < r; v++)
          for (y = v * I, A = v * i, g = 0; g < i; g++)
            ((f = (A + g) << 2),
              (x = 3 * (m = (n[y + (g >> 2)] >> (6 - ((3 & g) << 1))) & 3)),
              (w[f] = F[x]),
              (w[f + 1] = F[x + 1]),
              (w[f + 2] = F[x + 2]),
              (w[f + 3] = m < B ? k[m] : 255));
      if (_ == 4)
        for (v = 0; v < r; v++)
          for (y = v * I, A = v * i, g = 0; g < i; g++)
            ((f = (A + g) << 2),
              (x = 3 * (m = (n[y + (g >> 1)] >> (4 - ((1 & g) << 2))) & 15)),
              (w[f] = F[x]),
              (w[f + 1] = F[x + 1]),
              (w[f + 2] = F[x + 2]),
              (w[f + 3] = m < B ? k[m] : 255));
      if (_ == 8)
        for (g = 0; g < h; g++) {
          var m;
          ((f = g << 2),
            (x = 3 * (m = n[g])),
            (w[f] = F[x]),
            (w[f + 1] = F[x + 1]),
            (w[f + 2] = F[x + 2]),
            (w[f + 3] = m < B ? k[m] : 255));
        }
    } else if (T == 4) {
      if (_ == 8)
        for (g = 0; g < h; g++) {
          f = g << 2;
          var E = n[(c = g << 1)];
          ((w[f] = E), (w[f + 1] = E), (w[f + 2] = E), (w[f + 3] = n[c + 1]));
        }
      if (_ == 16)
        for (g = 0; g < h; g++) {
          var c;
          ((f = g << 2),
            (E = n[(c = g << 2)]),
            (w[f] = E),
            (w[f + 1] = E),
            (w[f + 2] = E),
            (w[f + 3] = n[c + 2]));
        }
    } else if (T == 0)
      for (l = s.tabs.tRNS ? s.tabs.tRNS : -1, v = 0; v < r; v++) {
        const F = v * I,
          k = v * i;
        if (_ == 1)
          for (var o = 0; o < i; o++) {
            var P = (E = 255 * ((n[F + (o >>> 3)] >>> (7 - (7 & o))) & 1)) == 255 * l ? 0 : 255;
            D[k + o] = (P << 24) | (E << 16) | (E << 8) | E;
          }
        else if (_ == 2)
          for (o = 0; o < i; o++)
            ((P = (E = 85 * ((n[F + (o >>> 2)] >>> (6 - ((3 & o) << 1))) & 3)) == 85 * l ? 0 : 255),
              (D[k + o] = (P << 24) | (E << 16) | (E << 8) | E));
        else if (_ == 4)
          for (o = 0; o < i; o++)
            ((P =
              (E = 17 * ((n[F + (o >>> 1)] >>> (4 - ((1 & o) << 2))) & 15)) == 17 * l ? 0 : 255),
              (D[k + o] = (P << 24) | (E << 16) | (E << 8) | E));
        else if (_ == 8)
          for (o = 0; o < i; o++)
            ((P = (E = n[F + o]) == l ? 0 : 255),
              (D[k + o] = (P << 24) | (E << 16) | (E << 8) | E));
        else if (_ == 16)
          for (o = 0; o < i; o++)
            ((E = n[F + (o << 1)]),
              (P = O(n, F + (o << 1)) == l ? 0 : 255),
              (D[k + o] = (P << 24) | (E << 16) | (E << 8) | E));
      }
    return w;
  }
  function N(n, i, r, s) {
    const h = t(n),
      U = Math.ceil((r * h) / 8),
      I = new Uint8Array((U + 1 + n.interlace) * s);
    return (
      (i = n.tabs.CgBI ? e(i, I) : d(i, I)),
      n.interlace == 0
        ? (i = u(i, n, 0, r, s))
        : n.interlace == 1 &&
          (i = (function (D, T) {
            const _ = T.width,
              O = T.height,
              g = t(T),
              S = g >> 3,
              l = Math.ceil((_ * g) / 8),
              f = new Uint8Array(O * l);
            let v = 0;
            const y = [0, 0, 4, 0, 2, 0, 1],
              A = [0, 4, 0, 2, 0, 1, 0],
              x = [8, 8, 8, 4, 4, 2, 2],
              m = [8, 8, 4, 4, 2, 2, 1];
            let E = 0;
            for (; E < 7; ) {
              const o = x[E],
                P = m[E];
              let F = 0,
                k = 0,
                B = y[E];
              for (; B < O; ) ((B += o), k++);
              let L = A[E];
              for (; L < _; ) ((L += P), F++);
              const j = Math.ceil((F * g) / 8);
              u(D, T, v, F, k);
              let H = 0,
                C = y[E];
              for (; C < O; ) {
                let z = A[E],
                  K = (v + H * j) << 3;
                for (; z < _; ) {
                  var c;
                  if (
                    (g == 1 &&
                      ((c = ((c = D[K >> 3]) >> (7 - (7 & K))) & 1),
                      (f[C * l + (z >> 3)] |= c << (7 - ((7 & z) << 0)))),
                    g == 2 &&
                      ((c = ((c = D[K >> 3]) >> (6 - (7 & K))) & 3),
                      (f[C * l + (z >> 2)] |= c << (6 - ((3 & z) << 1)))),
                    g == 4 &&
                      ((c = ((c = D[K >> 3]) >> (4 - (7 & K))) & 15),
                      (f[C * l + (z >> 1)] |= c << (4 - ((1 & z) << 2)))),
                    g >= 8)
                  ) {
                    const W = C * l + z * S;
                    for (let Q = 0; Q < S; Q++) f[W + Q] = D[(K >> 3) + Q];
                  }
                  ((K += g), (z += P));
                }
                (H++, (C += o));
              }
              (F * k != 0 && (v += k * (1 + j)), (E += 1));
            }
            return f;
          })(i, n)),
      i
    );
  }
  function d(n, i) {
    return e(new Uint8Array(n.buffer, 2, n.length - 6), i);
  }
  var e = (function () {
    const n = { H: {} };
    return (
      (n.H.N = function (i, r) {
        const s = Uint8Array;
        let h,
          U,
          I = 0,
          w = 0,
          D = 0,
          T = 0,
          _ = 0,
          O = 0,
          g = 0,
          S = 0,
          l = 0;
        if (i[0] == 3 && i[1] == 0) return r || new s(0);
        const f = n.H,
          v = f.b,
          y = f.e,
          A = f.R,
          x = f.n,
          m = f.A,
          E = f.Z,
          c = f.m,
          o = r == null;
        for (o && (r = new s((i.length >>> 2) << 5)); I == 0; )
          if (((I = v(i, l, 1)), (w = v(i, l + 1, 2)), (l += 3), w != 0)) {
            if (
              (o && (r = n.H.W(r, S + (1 << 17))),
              w == 1 && ((h = c.J), (U = c.h), (O = 511), (g = 31)),
              w == 2)
            ) {
              ((D = y(i, l, 5) + 257),
                (T = y(i, l + 5, 5) + 1),
                (_ = y(i, l + 10, 4) + 4),
                (l += 14));
              let F = 1;
              for (var P = 0; P < 38; P += 2) ((c.Q[P] = 0), (c.Q[P + 1] = 0));
              for (P = 0; P < _; P++) {
                const L = y(i, l + 3 * P, 3);
                ((c.Q[1 + (c.X[P] << 1)] = L), L > F && (F = L));
              }
              ((l += 3 * _),
                x(c.Q, F),
                m(c.Q, F, c.u),
                (h = c.w),
                (U = c.d),
                (l = A(c.u, (1 << F) - 1, D + T, i, l, c.v)));
              const k = f.V(c.v, 0, D, c.C);
              O = (1 << k) - 1;
              const B = f.V(c.v, D, T, c.D);
              ((g = (1 << B) - 1), x(c.C, k), m(c.C, k, h), x(c.D, B), m(c.D, B, U));
            }
            for (;;) {
              const F = h[E(i, l) & O];
              l += 15 & F;
              const k = F >>> 4;
              if (!(k >>> 8)) r[S++] = k;
              else {
                if (k == 256) break;
                {
                  let B = S + k - 254;
                  if (k > 264) {
                    const z = c.q[k - 257];
                    ((B = S + (z >>> 3) + y(i, l, 7 & z)), (l += 7 & z));
                  }
                  const L = U[E(i, l) & g];
                  l += 15 & L;
                  const j = L >>> 4,
                    H = c.c[j],
                    C = (H >>> 4) + v(i, l, 15 & H);
                  for (l += 15 & H; S < B; )
                    ((r[S] = r[S++ - C]),
                      (r[S] = r[S++ - C]),
                      (r[S] = r[S++ - C]),
                      (r[S] = r[S++ - C]));
                  S = B;
                }
              }
            }
          } else {
            (7 & l) != 0 && (l += 8 - (7 & l));
            const F = 4 + (l >>> 3),
              k = i[F - 4] | (i[F - 3] << 8);
            (o && (r = n.H.W(r, S + k)),
              r.set(new s(i.buffer, i.byteOffset + F, k), S),
              (l = (F + k) << 3),
              (S += k));
          }
        return r.length == S ? r : r.slice(0, S);
      }),
      (n.H.W = function (i, r) {
        const s = i.length;
        if (r <= s) return i;
        const h = new Uint8Array(s << 1);
        return (h.set(i, 0), h);
      }),
      (n.H.R = function (i, r, s, h, U, I) {
        const w = n.H.e,
          D = n.H.Z;
        let T = 0;
        for (; T < s; ) {
          const _ = i[D(h, U) & r];
          U += 15 & _;
          const O = _ >>> 4;
          if (O <= 15) ((I[T] = O), T++);
          else {
            let g = 0,
              S = 0;
            O == 16
              ? ((S = 3 + w(h, U, 2)), (U += 2), (g = I[T - 1]))
              : O == 17
                ? ((S = 3 + w(h, U, 3)), (U += 3))
                : O == 18 && ((S = 11 + w(h, U, 7)), (U += 7));
            const l = T + S;
            for (; T < l; ) ((I[T] = g), T++);
          }
        }
        return U;
      }),
      (n.H.V = function (i, r, s, h) {
        let U = 0,
          I = 0;
        const w = h.length >>> 1;
        for (; I < s; ) {
          const D = i[I + r];
          ((h[I << 1] = 0), (h[1 + (I << 1)] = D), D > U && (U = D), I++);
        }
        for (; I < w; ) ((h[I << 1] = 0), (h[1 + (I << 1)] = 0), I++);
        return U;
      }),
      (n.H.n = function (i, r) {
        const s = n.H.m,
          h = i.length;
        let U, I, w, D;
        const T = s.j;
        for (var _ = 0; _ <= r; _++) T[_] = 0;
        for (_ = 1; _ < h; _ += 2) T[i[_]]++;
        const O = s.K;
        for (U = 0, T[0] = 0, I = 1; I <= r; I++) ((U = (U + T[I - 1]) << 1), (O[I] = U));
        for (w = 0; w < h; w += 2) ((D = i[w + 1]), D != 0 && ((i[w] = O[D]), O[D]++));
      }),
      (n.H.A = function (i, r, s) {
        const h = i.length,
          U = n.H.m.r;
        for (let I = 0; I < h; I += 2)
          if (i[I + 1] != 0) {
            const w = I >> 1,
              D = i[I + 1],
              T = (w << 4) | D,
              _ = r - D;
            let O = i[I] << _;
            const g = O + (1 << _);
            for (; O != g; ) ((s[U[O] >>> (15 - r)] = T), O++);
          }
      }),
      (n.H.l = function (i, r) {
        const s = n.H.m.r,
          h = 15 - r;
        for (let U = 0; U < i.length; U += 2) {
          const I = i[U] << (r - i[U + 1]);
          i[U] = s[I] >>> h;
        }
      }),
      (n.H.M = function (i, r, s) {
        s <<= 7 & r;
        const h = r >>> 3;
        ((i[h] |= s), (i[h + 1] |= s >>> 8));
      }),
      (n.H.I = function (i, r, s) {
        s <<= 7 & r;
        const h = r >>> 3;
        ((i[h] |= s), (i[h + 1] |= s >>> 8), (i[h + 2] |= s >>> 16));
      }),
      (n.H.e = function (i, r, s) {
        return ((i[r >>> 3] | (i[1 + (r >>> 3)] << 8)) >>> (7 & r)) & ((1 << s) - 1);
      }),
      (n.H.b = function (i, r, s) {
        return (
          ((i[r >>> 3] | (i[1 + (r >>> 3)] << 8) | (i[2 + (r >>> 3)] << 16)) >>> (7 & r)) &
          ((1 << s) - 1)
        );
      }),
      (n.H.Z = function (i, r) {
        return (i[r >>> 3] | (i[1 + (r >>> 3)] << 8) | (i[2 + (r >>> 3)] << 16)) >>> (7 & r);
      }),
      (n.H.i = function (i, r) {
        return (
          (i[r >>> 3] |
            (i[1 + (r >>> 3)] << 8) |
            (i[2 + (r >>> 3)] << 16) |
            (i[3 + (r >>> 3)] << 24)) >>>
          (7 & r)
        );
      }),
      (n.H.m = (function () {
        const i = Uint16Array,
          r = Uint32Array;
        return {
          K: new i(16),
          j: new i(16),
          X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
          S: [
            3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99,
            115, 131, 163, 195, 227, 258, 999, 999, 999,
          ],
          T: [
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0,
            0, 0, 0,
          ],
          q: new i(32),
          p: [
            1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025,
            1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535,
          ],
          z: [
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
            12, 13, 13, 0, 0,
          ],
          c: new r(32),
          J: new i(512),
          _: [],
          h: new i(32),
          $: [],
          w: new i(32768),
          C: [],
          v: [],
          d: new i(32768),
          D: [],
          u: new i(512),
          Q: [],
          r: new i(32768),
          s: new r(286),
          Y: new r(30),
          a: new r(19),
          t: new r(15e3),
          k: new i(65536),
          g: new i(32768),
        };
      })()),
      (function () {
        const i = n.H.m;
        for (var r = 0; r < 32768; r++) {
          let h = r;
          ((h = ((2863311530 & h) >>> 1) | ((1431655765 & h) << 1)),
            (h = ((3435973836 & h) >>> 2) | ((858993459 & h) << 2)),
            (h = ((4042322160 & h) >>> 4) | ((252645135 & h) << 4)),
            (h = ((4278255360 & h) >>> 8) | ((16711935 & h) << 8)),
            (i.r[r] = ((h >>> 16) | (h << 16)) >>> 17));
        }
        function s(h, U, I) {
          for (; U-- != 0; ) h.push(0, I);
        }
        for (r = 0; r < 32; r++)
          ((i.q[r] = (i.S[r] << 3) | i.T[r]), (i.c[r] = (i.p[r] << 4) | i.z[r]));
        (s(i._, 144, 8),
          s(i._, 112, 9),
          s(i._, 24, 7),
          s(i._, 8, 8),
          n.H.n(i._, 9),
          n.H.A(i._, 9, i.J),
          n.H.l(i._, 9),
          s(i.$, 32, 5),
          n.H.n(i.$, 5),
          n.H.A(i.$, 5, i.h),
          n.H.l(i.$, 5),
          s(i.Q, 19, 0),
          s(i.C, 286, 0),
          s(i.D, 30, 0),
          s(i.v, 320, 0));
      })(),
      n.H.N
    );
  })();
  function t(n) {
    return [1, null, 3, 1, 2, null, 4][n.ctype] * n.depth;
  }
  function u(n, i, r, s, h) {
    let U = t(i);
    const I = Math.ceil((s * U) / 8);
    let w, D;
    U = Math.ceil(U / 8);
    let T = n[r],
      _ = 0;
    if ((T > 1 && (n[r] = [0, 0, 1][T - 2]), T == 3))
      for (_ = U; _ < I; _++) n[_ + 1] = (n[_ + 1] + (n[_ + 1 - U] >>> 1)) & 255;
    for (let O = 0; O < h; O++)
      if (((w = r + O * I), (D = w + O + 1), (T = n[D - 1]), (_ = 0), T == 0))
        for (; _ < I; _++) n[w + _] = n[D + _];
      else if (T == 1) {
        for (; _ < U; _++) n[w + _] = n[D + _];
        for (; _ < I; _++) n[w + _] = n[D + _] + n[w + _ - U];
      } else if (T == 2) for (; _ < I; _++) n[w + _] = n[D + _] + n[w + _ - I];
      else if (T == 3) {
        for (; _ < U; _++) n[w + _] = n[D + _] + (n[w + _ - I] >>> 1);
        for (; _ < I; _++) n[w + _] = n[D + _] + ((n[w + _ - I] + n[w + _ - U]) >>> 1);
      } else {
        for (; _ < U; _++) n[w + _] = n[D + _] + a(0, n[w + _ - I], 0);
        for (; _ < I; _++) n[w + _] = n[D + _] + a(n[w + _ - U], n[w + _ - I], n[w + _ - U - I]);
      }
    return n;
  }
  function a(n, i, r) {
    const s = n + i - r,
      h = s - n,
      U = s - i,
      I = s - r;
    return h * h <= U * U && h * h <= I * I ? n : U * U <= I * I ? i : r;
  }
  function p(n, i, r) {
    ((r.width = M.readUint(n, i)),
      (i += 4),
      (r.height = M.readUint(n, i)),
      (i += 4),
      (r.depth = n[i]),
      i++,
      (r.ctype = n[i]),
      i++,
      (r.compress = n[i]),
      i++,
      (r.filter = n[i]),
      i++,
      (r.interlace = n[i]),
      i++);
  }
  function b(n, i, r, s, h, U, I, w, D) {
    const T = Math.min(i, h),
      _ = Math.min(r, U);
    let O = 0,
      g = 0;
    for (let E = 0; E < _; E++)
      for (let c = 0; c < T; c++)
        if (
          (I >= 0 && w >= 0
            ? ((O = (E * i + c) << 2), (g = ((w + E) * h + I + c) << 2))
            : ((O = ((-w + E) * i - I + c) << 2), (g = (E * h + c) << 2)),
          D == 0)
        )
          ((s[g] = n[O]), (s[g + 1] = n[O + 1]), (s[g + 2] = n[O + 2]), (s[g + 3] = n[O + 3]));
        else if (D == 1) {
          var S = n[O + 3] * 0.00392156862745098,
            l = n[O] * S,
            f = n[O + 1] * S,
            v = n[O + 2] * S,
            y = s[g + 3] * (1 / 255),
            A = s[g] * y,
            x = s[g + 1] * y,
            m = s[g + 2] * y;
          const o = 1 - S,
            P = S + y * o,
            F = P == 0 ? 0 : 1 / P;
          ((s[g + 3] = 255 * P),
            (s[g + 0] = (l + A * o) * F),
            (s[g + 1] = (f + x * o) * F),
            (s[g + 2] = (v + m * o) * F));
        } else if (D == 2)
          ((S = n[O + 3]),
            (l = n[O]),
            (f = n[O + 1]),
            (v = n[O + 2]),
            (y = s[g + 3]),
            (A = s[g]),
            (x = s[g + 1]),
            (m = s[g + 2]),
            S == y && l == A && f == x && v == m
              ? ((s[g] = 0), (s[g + 1] = 0), (s[g + 2] = 0), (s[g + 3] = 0))
              : ((s[g] = l), (s[g + 1] = f), (s[g + 2] = v), (s[g + 3] = S)));
        else if (D == 3) {
          if (
            ((S = n[O + 3]),
            (l = n[O]),
            (f = n[O + 1]),
            (v = n[O + 2]),
            (y = s[g + 3]),
            (A = s[g]),
            (x = s[g + 1]),
            (m = s[g + 2]),
            S == y && l == A && f == x && v == m)
          )
            continue;
          if (S < 220 && y > 20) return !1;
        }
    return !0;
  }
  return {
    decode: function (i) {
      const r = new Uint8Array(i);
      let s = 8;
      const h = M,
        U = h.readUshort,
        I = h.readUint,
        w = { tabs: {}, frames: [] },
        D = new Uint8Array(r.length);
      let T,
        _ = 0,
        O = 0;
      const g = [137, 80, 78, 71, 13, 10, 26, 10];
      for (var S = 0; S < 8; S++) if (r[S] != g[S]) throw "The input is not a PNG file!";
      for (; s < r.length; ) {
        const E = h.readUint(r, s);
        s += 4;
        const c = h.readASCII(r, s, 4);
        if (((s += 4), c == "IHDR")) p(r, s, w);
        else if (c == "iCCP") {
          for (var l = s; r[l] != 0; ) l++;
          (h.readASCII(r, s, l - s), r[l + 1]);
          const o = r.slice(l + 2, s + E);
          let P = null;
          try {
            P = d(o);
          } catch {
            P = e(o);
          }
          w.tabs[c] = P;
        } else if (c == "CgBI") w.tabs[c] = r.slice(s, s + 4);
        else if (c == "IDAT") {
          for (S = 0; S < E; S++) D[_ + S] = r[s + S];
          _ += E;
        } else if (c == "acTL")
          ((w.tabs[c] = { num_frames: I(r, s), num_plays: I(r, s + 4) }),
            (T = new Uint8Array(r.length)));
        else if (c == "fcTL") {
          O != 0 &&
            (((m = w.frames[w.frames.length - 1]).data = N(
              w,
              T.slice(0, O),
              m.rect.width,
              m.rect.height,
            )),
            (O = 0));
          const o = { x: I(r, s + 12), y: I(r, s + 16), width: I(r, s + 4), height: I(r, s + 8) };
          let P = U(r, s + 22);
          P = U(r, s + 20) / (P == 0 ? 100 : P);
          const F = { rect: o, delay: Math.round(1e3 * P), dispose: r[s + 24], blend: r[s + 25] };
          w.frames.push(F);
        } else if (c == "fdAT") {
          for (S = 0; S < E - 4; S++) T[O + S] = r[s + S + 4];
          O += E - 4;
        } else if (c == "pHYs") w.tabs[c] = [h.readUint(r, s), h.readUint(r, s + 4), r[s + 8]];
        else if (c == "cHRM")
          for (w.tabs[c] = [], S = 0; S < 8; S++) w.tabs[c].push(h.readUint(r, s + 4 * S));
        else if (c == "tEXt" || c == "zTXt") {
          w.tabs[c] == null && (w.tabs[c] = {});
          var f = h.nextZero(r, s),
            v = h.readASCII(r, s, f - s),
            y = s + E - f - 1;
          if (c == "tEXt") x = h.readASCII(r, f + 1, y);
          else {
            var A = d(r.slice(f + 2, f + 2 + y));
            x = h.readUTF8(A, 0, A.length);
          }
          w.tabs[c][v] = x;
        } else if (c == "iTXt") {
          (w.tabs[c] == null && (w.tabs[c] = {}),
            (f = 0),
            (l = s),
            (f = h.nextZero(r, l)),
            (v = h.readASCII(r, l, f - l)));
          const o = r[(l = f + 1)];
          var x;
          (r[l + 1],
            (l += 2),
            (f = h.nextZero(r, l)),
            h.readASCII(r, l, f - l),
            (l = f + 1),
            (f = h.nextZero(r, l)),
            h.readUTF8(r, l, f - l),
            (y = E - ((l = f + 1) - s)),
            o == 0
              ? (x = h.readUTF8(r, l, y))
              : ((A = d(r.slice(l, l + y))), (x = h.readUTF8(A, 0, A.length))),
            (w.tabs[c][v] = x));
        } else if (c == "PLTE") w.tabs[c] = h.readBytes(r, s, E);
        else if (c == "hIST") {
          const o = w.tabs.PLTE.length / 3;
          for (w.tabs[c] = [], S = 0; S < o; S++) w.tabs[c].push(U(r, s + 2 * S));
        } else if (c == "tRNS")
          w.ctype == 3
            ? (w.tabs[c] = h.readBytes(r, s, E))
            : w.ctype == 0
              ? (w.tabs[c] = U(r, s))
              : w.ctype == 2 && (w.tabs[c] = [U(r, s), U(r, s + 2), U(r, s + 4)]);
        else if (c == "gAMA") w.tabs[c] = h.readUint(r, s) / 1e5;
        else if (c == "sRGB") w.tabs[c] = r[s];
        else if (c == "bKGD")
          w.ctype == 0 || w.ctype == 4
            ? (w.tabs[c] = [U(r, s)])
            : w.ctype == 2 || w.ctype == 6
              ? (w.tabs[c] = [U(r, s), U(r, s + 2), U(r, s + 4)])
              : w.ctype == 3 && (w.tabs[c] = r[s]);
        else if (c == "IEND") break;
        ((s += E), h.readUint(r, s), (s += 4));
      }
      var m;
      return (
        O != 0 &&
          ((m = w.frames[w.frames.length - 1]).data = N(
            w,
            T.slice(0, O),
            m.rect.width,
            m.rect.height,
          )),
        (w.data = N(w, D, w.width, w.height)),
        delete w.compress,
        delete w.interlace,
        delete w.filter,
        w
      );
    },
    toRGBA8: function (i) {
      const r = i.width,
        s = i.height;
      if (i.tabs.acTL == null) return [R(i.data, r, s, i).buffer];
      const h = [];
      i.frames[0].data == null && (i.frames[0].data = i.data);
      const U = r * s * 4,
        I = new Uint8Array(U),
        w = new Uint8Array(U),
        D = new Uint8Array(U);
      for (let _ = 0; _ < i.frames.length; _++) {
        const O = i.frames[_],
          g = O.rect.x,
          S = O.rect.y,
          l = O.rect.width,
          f = O.rect.height,
          v = R(O.data, l, f, i);
        if (_ != 0) for (var T = 0; T < U; T++) D[T] = I[T];
        if (
          (O.blend == 0
            ? b(v, l, f, I, r, s, g, S, 0)
            : O.blend == 1 && b(v, l, f, I, r, s, g, S, 1),
          h.push(I.buffer.slice(0)),
          O.dispose != 0)
        ) {
          if (O.dispose == 1) b(w, l, f, I, r, s, g, S, 0);
          else if (O.dispose == 2) for (T = 0; T < U; T++) I[T] = D[T];
        }
      }
      return h;
    },
    _paeth: a,
    _copyTile: b,
    _bin: M,
  };
})();
(function () {
  const { _copyTile: M } = he,
    { _bin: R } = he,
    N = he._paeth;
  var d = {
    table: (function () {
      const l = new Uint32Array(256);
      for (let f = 0; f < 256; f++) {
        let v = f;
        for (let y = 0; y < 8; y++) 1 & v ? (v = 3988292384 ^ (v >>> 1)) : (v >>>= 1);
        l[f] = v;
      }
      return l;
    })(),
    update(l, f, v, y) {
      for (let A = 0; A < y; A++) l = d.table[255 & (l ^ f[v + A])] ^ (l >>> 8);
      return l;
    },
    crc: (l, f, v) => 4294967295 ^ d.update(4294967295, l, f, v),
  };
  function e(l, f, v, y) {
    ((f[v] += (l[0] * y) >> 4),
      (f[v + 1] += (l[1] * y) >> 4),
      (f[v + 2] += (l[2] * y) >> 4),
      (f[v + 3] += (l[3] * y) >> 4));
  }
  function t(l) {
    return Math.max(0, Math.min(255, l));
  }
  function u(l, f) {
    const v = l[0] - f[0],
      y = l[1] - f[1],
      A = l[2] - f[2],
      x = l[3] - f[3];
    return v * v + y * y + A * A + x * x;
  }
  function a(l, f, v, y, A, x, m) {
    m == null && (m = 1);
    const E = y.length,
      c = [];
    for (var o = 0; o < E; o++) {
      const C = y[o];
      c.push([(C >>> 0) & 255, (C >>> 8) & 255, (C >>> 16) & 255, (C >>> 24) & 255]);
    }
    for (o = 0; o < E; o++) {
      let C = 4294967295;
      for (var P = 0, F = 0; F < E; F++) {
        var k = u(c[o], c[F]);
        F != o && k < C && ((C = k), (P = F));
      }
    }
    const B = new Uint32Array(A.buffer),
      L = new Int16Array(f * v * 4),
      j = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (o = 0; o < j.length; o++) j[o] = 255 * ((j[o] + 0.5) / 16 - 0.5);
    for (let C = 0; C < v; C++)
      for (let z = 0; z < f; z++) {
        var H;
        ((o = 4 * (C * f + z)),
          m != 2
            ? (H = [
                t(l[o] + L[o]),
                t(l[o + 1] + L[o + 1]),
                t(l[o + 2] + L[o + 2]),
                t(l[o + 3] + L[o + 3]),
              ])
            : ((k = j[4 * (3 & C) + (3 & z)]),
              (H = [t(l[o] + k), t(l[o + 1] + k), t(l[o + 2] + k), t(l[o + 3] + k)])),
          (P = 0));
        let K = 16777215;
        for (F = 0; F < E; F++) {
          const G = u(H, c[F]);
          G < K && ((K = G), (P = F));
        }
        const W = c[P],
          Q = [H[0] - W[0], H[1] - W[1], H[2] - W[2], H[3] - W[3]];
        (m == 1 &&
          (z != f - 1 && e(Q, L, o + 4, 7),
          C != v - 1 &&
            (z != 0 && e(Q, L, o + 4 * f - 4, 3),
            e(Q, L, o + 4 * f, 5),
            z != f - 1 && e(Q, L, o + 4 * f + 4, 1))),
          (x[o >> 2] = P),
          (B[o >> 2] = y[P]));
      }
  }
  function p(l, f, v, y, A) {
    A == null && (A = {});
    const { crc: x } = d,
      m = R.writeUint,
      E = R.writeUshort,
      c = R.writeASCII;
    let o = 8;
    const P = l.frames.length > 1;
    let F,
      k = !1,
      B = 33 + (P ? 20 : 0);
    if (
      (A.sRGB != null && (B += 13),
      A.pHYs != null && (B += 21),
      A.iCCP != null && ((F = pako.deflate(A.iCCP)), (B += 21 + F.length + 4)),
      l.ctype == 3)
    ) {
      for (var L = l.plte.length, j = 0; j < L; j++) l.plte[j] >>> 24 != 255 && (k = !0);
      B += 8 + 3 * L + 4 + (k ? 8 + 1 * L + 4 : 0);
    }
    for (var H = 0; H < l.frames.length; H++)
      (P && (B += 38), (B += (W = l.frames[H]).cimg.length + 12), H != 0 && (B += 4));
    B += 12;
    const C = new Uint8Array(B),
      z = [137, 80, 78, 71, 13, 10, 26, 10];
    for (j = 0; j < 8; j++) C[j] = z[j];
    if (
      (m(C, o, 13),
      (o += 4),
      c(C, o, "IHDR"),
      (o += 4),
      m(C, o, f),
      (o += 4),
      m(C, o, v),
      (o += 4),
      (C[o] = l.depth),
      o++,
      (C[o] = l.ctype),
      o++,
      (C[o] = 0),
      o++,
      (C[o] = 0),
      o++,
      (C[o] = 0),
      o++,
      m(C, o, x(C, o - 17, 17)),
      (o += 4),
      A.sRGB != null &&
        (m(C, o, 1),
        (o += 4),
        c(C, o, "sRGB"),
        (o += 4),
        (C[o] = A.sRGB),
        o++,
        m(C, o, x(C, o - 5, 5)),
        (o += 4)),
      A.iCCP != null)
    ) {
      const Q = 13 + F.length;
      (m(C, o, Q),
        (o += 4),
        c(C, o, "iCCP"),
        (o += 4),
        c(C, o, "ICC profile"),
        (o += 11),
        (o += 2),
        C.set(F, o),
        (o += F.length),
        m(C, o, x(C, o - (Q + 4), Q + 4)),
        (o += 4));
    }
    if (
      (A.pHYs != null &&
        (m(C, o, 9),
        (o += 4),
        c(C, o, "pHYs"),
        (o += 4),
        m(C, o, A.pHYs[0]),
        (o += 4),
        m(C, o, A.pHYs[1]),
        (o += 4),
        (C[o] = A.pHYs[2]),
        o++,
        m(C, o, x(C, o - 13, 13)),
        (o += 4)),
      P &&
        (m(C, o, 8),
        (o += 4),
        c(C, o, "acTL"),
        (o += 4),
        m(C, o, l.frames.length),
        (o += 4),
        m(C, o, A.loop != null ? A.loop : 0),
        (o += 4),
        m(C, o, x(C, o - 12, 12)),
        (o += 4)),
      l.ctype == 3)
    ) {
      for (m(C, o, 3 * (L = l.plte.length)), o += 4, c(C, o, "PLTE"), o += 4, j = 0; j < L; j++) {
        const Q = 3 * j,
          G = l.plte[j],
          V = 255 & G,
          te = (G >>> 8) & 255,
          ye = (G >>> 16) & 255;
        ((C[o + Q + 0] = V), (C[o + Q + 1] = te), (C[o + Q + 2] = ye));
      }
      if (((o += 3 * L), m(C, o, x(C, o - 3 * L - 4, 3 * L + 4)), (o += 4), k)) {
        for (m(C, o, L), o += 4, c(C, o, "tRNS"), o += 4, j = 0; j < L; j++)
          C[o + j] = (l.plte[j] >>> 24) & 255;
        ((o += L), m(C, o, x(C, o - L - 4, L + 4)), (o += 4));
      }
    }
    let K = 0;
    for (H = 0; H < l.frames.length; H++) {
      var W = l.frames[H];
      P &&
        (m(C, o, 26),
        (o += 4),
        c(C, o, "fcTL"),
        (o += 4),
        m(C, o, K++),
        (o += 4),
        m(C, o, W.rect.width),
        (o += 4),
        m(C, o, W.rect.height),
        (o += 4),
        m(C, o, W.rect.x),
        (o += 4),
        m(C, o, W.rect.y),
        (o += 4),
        E(C, o, y[H]),
        (o += 2),
        E(C, o, 1e3),
        (o += 2),
        (C[o] = W.dispose),
        o++,
        (C[o] = W.blend),
        o++,
        m(C, o, x(C, o - 30, 30)),
        (o += 4));
      const Q = W.cimg;
      (m(C, o, (L = Q.length) + (H == 0 ? 0 : 4)), (o += 4));
      const G = o;
      (c(C, o, H == 0 ? "IDAT" : "fdAT"),
        (o += 4),
        H != 0 && (m(C, o, K++), (o += 4)),
        C.set(Q, o),
        (o += L),
        m(C, o, x(C, G, o - G)),
        (o += 4));
    }
    return (
      m(C, o, 0),
      (o += 4),
      c(C, o, "IEND"),
      (o += 4),
      m(C, o, x(C, o - 4, 4)),
      (o += 4),
      C.buffer
    );
  }
  function b(l, f, v) {
    for (let y = 0; y < l.frames.length; y++) {
      const A = l.frames[y];
      A.rect.width;
      const x = A.rect.height,
        m = new Uint8Array(x * A.bpl + x);
      A.cimg = s(A.img, x, A.bpp, A.bpl, m, f, v);
    }
  }
  function n(l, f, v, y, A) {
    const x = A[0],
      m = A[1],
      E = A[2],
      c = A[3],
      o = A[4],
      P = A[5];
    let F = 6,
      k = 8,
      B = 255;
    for (var L = 0; L < l.length; L++) {
      const ne = new Uint8Array(l[L]);
      for (var j = ne.length, H = 0; H < j; H += 4) B &= ne[H + 3];
    }
    const C = B != 255,
      z = (function (Z, q, re, ae, Y, le) {
        const J = [];
        for (var $ = 0; $ < Z.length; $++) {
          const se = new Uint8Array(Z[$]),
            de = new Uint32Array(se.buffer);
          var ce;
          let ue = 0,
            ve = 0,
            pe = q,
            Ue = re,
            Le = ae ? 1 : 0;
          if ($ != 0) {
            const ot = le || ae || $ == 1 || J[$ - 2].dispose != 0 ? 1 : 2;
            let je = 0,
              We = 1e9;
            for (let Ce = 0; Ce < ot; Ce++) {
              var be = new Uint8Array(Z[$ - 1 - Ce]);
              const at = new Uint32Array(Z[$ - 1 - Ce]);
              let we = q,
                Ae = re,
                Ie = -1,
                Re = -1;
              for (let Fe = 0; Fe < re; Fe++)
                for (let Ee = 0; Ee < q; Ee++)
                  de[(ie = Fe * q + Ee)] != at[ie] &&
                    (Ee < we && (we = Ee),
                    Ee > Ie && (Ie = Ee),
                    Fe < Ae && (Ae = Fe),
                    Fe > Re && (Re = Fe));
              (Ie == -1 && (we = Ae = Ie = Re = 0),
                Y && ((1 & we) == 1 && we--, (1 & Ae) == 1 && Ae--));
              const Ge = (Ie - we + 1) * (Re - Ae + 1);
              Ge < We &&
                ((We = Ge),
                (je = Ce),
                (ue = we),
                (ve = Ae),
                (pe = Ie - we + 1),
                (Ue = Re - Ae + 1));
            }
            ((be = new Uint8Array(Z[$ - 1 - je])),
              je == 1 && (J[$ - 1].dispose = 2),
              (ce = new Uint8Array(pe * Ue * 4)),
              M(be, q, re, ce, pe, Ue, -ue, -ve, 0),
              (Le = M(se, q, re, ce, pe, Ue, -ue, -ve, 3) ? 1 : 0),
              Le == 1
                ? r(se, q, re, ce, { x: ue, y: ve, width: pe, height: Ue })
                : M(se, q, re, ce, pe, Ue, -ue, -ve, 0));
          } else ce = se.slice(0);
          J.push({ rect: { x: ue, y: ve, width: pe, height: Ue }, img: ce, blend: Le, dispose: 0 });
        }
        if (ae)
          for ($ = 0; $ < J.length; $++) {
            if ((xe = J[$]).blend == 1) continue;
            const se = xe.rect,
              de = J[$ - 1].rect,
              ue = Math.min(se.x, de.x),
              ve = Math.min(se.y, de.y),
              pe = {
                x: ue,
                y: ve,
                width: Math.max(se.x + se.width, de.x + de.width) - ue,
                height: Math.max(se.y + se.height, de.y + de.height) - ve,
              };
            ((J[$ - 1].dispose = 1),
              $ - 1 != 0 && i(Z, q, re, J, $ - 1, pe, Y),
              i(Z, q, re, J, $, pe, Y));
          }
        let Se = 0;
        if (Z.length != 1)
          for (var ie = 0; ie < J.length; ie++) {
            var xe;
            Se += (xe = J[ie]).rect.width * xe.rect.height;
          }
        return J;
      })(l, f, v, x, m, E),
      K = {},
      W = [],
      Q = [];
    if (y != 0) {
      const ne = [];
      for (H = 0; H < z.length; H++) ne.push(z[H].img.buffer);
      const Z = (function (Y) {
          let le = 0;
          for (var J = 0; J < Y.length; J++) le += Y[J].byteLength;
          const $ = new Uint8Array(le);
          let ce = 0;
          for (J = 0; J < Y.length; J++) {
            const be = new Uint8Array(Y[J]),
              Se = be.length;
            for (let ie = 0; ie < Se; ie += 4) {
              let xe = be[ie],
                se = be[ie + 1],
                de = be[ie + 2];
              const ue = be[ie + 3];
              (ue == 0 && (xe = se = de = 0),
                ($[ce + ie] = xe),
                ($[ce + ie + 1] = se),
                ($[ce + ie + 2] = de),
                ($[ce + ie + 3] = ue));
            }
            ce += Se;
          }
          return $.buffer;
        })(ne),
        q = U(Z, y);
      for (H = 0; H < q.plte.length; H++) W.push(q.plte[H].est.rgba);
      let re = 0;
      for (H = 0; H < z.length; H++) {
        const ae = (V = z[H]).img.length;
        var G = new Uint8Array(q.inds.buffer, re >> 2, ae >> 2);
        Q.push(G);
        const Y = new Uint8Array(q.abuf, re, ae);
        (P && a(V.img, V.rect.width, V.rect.height, W, Y, G), V.img.set(Y), (re += ae));
      }
    } else
      for (L = 0; L < z.length; L++) {
        var V = z[L];
        const ne = new Uint32Array(V.img.buffer);
        var te = V.rect.width;
        for (j = ne.length, G = new Uint8Array(j), Q.push(G), H = 0; H < j; H++) {
          const Z = ne[H];
          if (H != 0 && Z == ne[H - 1]) G[H] = G[H - 1];
          else if (H > te && Z == ne[H - te]) G[H] = G[H - te];
          else {
            let q = K[Z];
            if (q == null && ((K[Z] = q = W.length), W.push(Z), W.length >= 300)) break;
            G[H] = q;
          }
        }
      }
    const ye = W.length;
    for (
      ye <= 256 &&
        o == 0 &&
        ((k = ye <= 2 ? 1 : ye <= 4 ? 2 : ye <= 16 ? 4 : 8), (k = Math.max(k, c))),
        L = 0;
      L < z.length;
      L++
    ) {
      ((V = z[L]).rect.x, V.rect.y, (te = V.rect.width));
      const ne = V.rect.height;
      let Z = V.img;
      new Uint32Array(Z.buffer);
      let q = 4 * te,
        re = 4;
      if (ye <= 256 && o == 0) {
        q = Math.ceil((k * te) / 8);
        var ge = new Uint8Array(q * ne);
        const ae = Q[L];
        for (let Y = 0; Y < ne; Y++) {
          H = Y * q;
          const le = Y * te;
          if (k == 8) for (var X = 0; X < te; X++) ge[H + X] = ae[le + X];
          else if (k == 4)
            for (X = 0; X < te; X++) ge[H + (X >> 1)] |= ae[le + X] << (4 - 4 * (1 & X));
          else if (k == 2)
            for (X = 0; X < te; X++) ge[H + (X >> 2)] |= ae[le + X] << (6 - 2 * (3 & X));
          else if (k == 1)
            for (X = 0; X < te; X++) ge[H + (X >> 3)] |= ae[le + X] << (7 - 1 * (7 & X));
        }
        ((Z = ge), (F = 3), (re = 1));
      } else if (C == 0 && z.length == 1) {
        ge = new Uint8Array(te * ne * 3);
        const ae = te * ne;
        for (H = 0; H < ae; H++) {
          const Y = 3 * H,
            le = 4 * H;
          ((ge[Y] = Z[le]), (ge[Y + 1] = Z[le + 1]), (ge[Y + 2] = Z[le + 2]));
        }
        ((Z = ge), (F = 2), (re = 3), (q = 3 * te));
      }
      ((V.img = Z), (V.bpl = q), (V.bpp = re));
    }
    return { ctype: F, depth: k, plte: W, frames: z };
  }
  function i(l, f, v, y, A, x, m) {
    const E = Uint8Array,
      c = Uint32Array,
      o = new E(l[A - 1]),
      P = new c(l[A - 1]),
      F = A + 1 < l.length ? new E(l[A + 1]) : null,
      k = new E(l[A]),
      B = new c(k.buffer);
    let L = f,
      j = v,
      H = -1,
      C = -1;
    for (let K = 0; K < x.height; K++)
      for (let W = 0; W < x.width; W++) {
        const Q = x.x + W,
          G = x.y + K,
          V = G * f + Q,
          te = B[V];
        te == 0 ||
          (y[A - 1].dispose == 0 && P[V] == te && (F == null || F[4 * V + 3] != 0)) ||
          (Q < L && (L = Q), Q > H && (H = Q), G < j && (j = G), G > C && (C = G));
      }
    (H == -1 && (L = j = H = C = 0),
      m && ((1 & L) == 1 && L--, (1 & j) == 1 && j--),
      (x = { x: L, y: j, width: H - L + 1, height: C - j + 1 }));
    const z = y[A];
    ((z.rect = x),
      (z.blend = 1),
      (z.img = new Uint8Array(x.width * x.height * 4)),
      y[A - 1].dispose == 0
        ? (M(o, f, v, z.img, x.width, x.height, -x.x, -x.y, 0), r(k, f, v, z.img, x))
        : M(k, f, v, z.img, x.width, x.height, -x.x, -x.y, 0));
  }
  function r(l, f, v, y, A) {
    M(l, f, v, y, A.width, A.height, -A.x, -A.y, 2);
  }
  function s(l, f, v, y, A, x, m) {
    const E = [];
    let c,
      o = [0, 1, 2, 3, 4];
    (x != -1 ? (o = [x]) : (f * y > 5e5 || v == 1) && (o = [0]), m && (c = { level: 0 }));
    const P = pt;
    for (var F = 0; F < o.length; F++) {
      for (let L = 0; L < f; L++) h(A, l, L, y, v, o[F]);
      E.push(P.deflate(A, c));
    }
    let k,
      B = 1e9;
    for (F = 0; F < E.length; F++) E[F].length < B && ((k = F), (B = E[F].length));
    return E[k];
  }
  function h(l, f, v, y, A, x) {
    const m = v * y;
    let E = m + v;
    if (((l[E] = x), E++, x == 0))
      if (y < 500) for (var c = 0; c < y; c++) l[E + c] = f[m + c];
      else l.set(new Uint8Array(f.buffer, m, y), E);
    else if (x == 1) {
      for (c = 0; c < A; c++) l[E + c] = f[m + c];
      for (c = A; c < y; c++) l[E + c] = (f[m + c] - f[m + c - A] + 256) & 255;
    } else if (v == 0) {
      for (c = 0; c < A; c++) l[E + c] = f[m + c];
      if (x == 2) for (c = A; c < y; c++) l[E + c] = f[m + c];
      if (x == 3) for (c = A; c < y; c++) l[E + c] = (f[m + c] - (f[m + c - A] >> 1) + 256) & 255;
      if (x == 4) for (c = A; c < y; c++) l[E + c] = (f[m + c] - N(f[m + c - A], 0, 0) + 256) & 255;
    } else {
      if (x == 2) for (c = 0; c < y; c++) l[E + c] = (f[m + c] + 256 - f[m + c - y]) & 255;
      if (x == 3) {
        for (c = 0; c < A; c++) l[E + c] = (f[m + c] + 256 - (f[m + c - y] >> 1)) & 255;
        for (c = A; c < y; c++)
          l[E + c] = (f[m + c] + 256 - ((f[m + c - y] + f[m + c - A]) >> 1)) & 255;
      }
      if (x == 4) {
        for (c = 0; c < A; c++) l[E + c] = (f[m + c] + 256 - N(0, f[m + c - y], 0)) & 255;
        for (c = A; c < y; c++)
          l[E + c] = (f[m + c] + 256 - N(f[m + c - A], f[m + c - y], f[m + c - A - y])) & 255;
      }
    }
  }
  function U(l, f) {
    const v = new Uint8Array(l),
      y = v.slice(0),
      A = new Uint32Array(y.buffer),
      x = I(y, f),
      m = x[0],
      E = x[1],
      c = v.length,
      o = new Uint8Array(c >> 2);
    let P;
    if (v.length < 2e7)
      for (var F = 0; F < c; F += 4)
        ((P = w(
          m,
          (k = v[F] * (1 / 255)),
          (B = v[F + 1] * (1 / 255)),
          (L = v[F + 2] * (1 / 255)),
          (j = v[F + 3] * (1 / 255)),
        )),
          (o[F >> 2] = P.ind),
          (A[F >> 2] = P.est.rgba));
    else
      for (F = 0; F < c; F += 4) {
        var k = v[F] * 0.00392156862745098,
          B = v[F + 1] * (1 / 255),
          L = v[F + 2] * (1 / 255),
          j = v[F + 3] * (1 / 255);
        for (P = m; P.left; ) P = D(P.est, k, B, L, j) <= 0 ? P.left : P.right;
        ((o[F >> 2] = P.ind), (A[F >> 2] = P.est.rgba));
      }
    return { abuf: y.buffer, inds: o, plte: E };
  }
  function I(l, f, v) {
    v == null && (v = 1e-4);
    const y = new Uint32Array(l.buffer),
      A = { i0: 0, i1: l.length, bst: null, est: null, tdst: 0, left: null, right: null };
    ((A.bst = O(l, A.i0, A.i1)), (A.est = g(A.bst)));
    const x = [A];
    for (; x.length < f; ) {
      let E = 0,
        c = 0;
      for (var m = 0; m < x.length; m++) x[m].est.L > E && ((E = x[m].est.L), (c = m));
      if (E < v) break;
      const o = x[c],
        P = T(l, y, o.i0, o.i1, o.est.e, o.est.eMq255);
      if (o.i0 >= P || o.i1 <= P) {
        o.est.L = 0;
        continue;
      }
      const F = { i0: o.i0, i1: P, bst: null, est: null, tdst: 0, left: null, right: null };
      ((F.bst = O(l, F.i0, F.i1)), (F.est = g(F.bst)));
      const k = { i0: P, i1: o.i1, bst: null, est: null, tdst: 0, left: null, right: null };
      for (k.bst = { R: [], m: [], N: o.bst.N - F.bst.N }, m = 0; m < 16; m++)
        k.bst.R[m] = o.bst.R[m] - F.bst.R[m];
      for (m = 0; m < 4; m++) k.bst.m[m] = o.bst.m[m] - F.bst.m[m];
      ((k.est = g(k.bst)), (o.left = F), (o.right = k), (x[c] = F), x.push(k));
    }
    for (x.sort((E, c) => c.bst.N - E.bst.N), m = 0; m < x.length; m++) x[m].ind = m;
    return [A, x];
  }
  function w(l, f, v, y, A) {
    if (l.left == null)
      return (
        (l.tdst = (function (F, k, B, L, j) {
          const H = k - F[0],
            C = B - F[1],
            z = L - F[2],
            K = j - F[3];
          return H * H + C * C + z * z + K * K;
        })(l.est.q, f, v, y, A)),
        l
      );
    const x = D(l.est, f, v, y, A);
    let m = l.left,
      E = l.right;
    x > 0 && ((m = l.right), (E = l.left));
    const c = w(m, f, v, y, A);
    if (c.tdst <= x * x) return c;
    const o = w(E, f, v, y, A);
    return o.tdst < c.tdst ? o : c;
  }
  function D(l, f, v, y, A) {
    const { e: x } = l;
    return x[0] * f + x[1] * v + x[2] * y + x[3] * A - l.eMq;
  }
  function T(l, f, v, y, A, x) {
    for (y -= 4; v < y; ) {
      for (; _(l, v, A) <= x; ) v += 4;
      for (; _(l, y, A) > x; ) y -= 4;
      if (v >= y) break;
      const m = f[v >> 2];
      ((f[v >> 2] = f[y >> 2]), (f[y >> 2] = m), (v += 4), (y -= 4));
    }
    for (; _(l, v, A) > x; ) v -= 4;
    return v + 4;
  }
  function _(l, f, v) {
    return l[f] * v[0] + l[f + 1] * v[1] + l[f + 2] * v[2] + l[f + 3] * v[3];
  }
  function O(l, f, v) {
    const y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      A = [0, 0, 0, 0],
      x = (v - f) >> 2;
    for (let m = f; m < v; m += 4) {
      const E = l[m] * 0.00392156862745098,
        c = l[m + 1] * (1 / 255),
        o = l[m + 2] * (1 / 255),
        P = l[m + 3] * (1 / 255);
      ((A[0] += E),
        (A[1] += c),
        (A[2] += o),
        (A[3] += P),
        (y[0] += E * E),
        (y[1] += E * c),
        (y[2] += E * o),
        (y[3] += E * P),
        (y[5] += c * c),
        (y[6] += c * o),
        (y[7] += c * P),
        (y[10] += o * o),
        (y[11] += o * P),
        (y[15] += P * P));
    }
    return (
      (y[4] = y[1]),
      (y[8] = y[2]),
      (y[9] = y[6]),
      (y[12] = y[3]),
      (y[13] = y[7]),
      (y[14] = y[11]),
      { R: y, m: A, N: x }
    );
  }
  function g(l) {
    const { R: f } = l,
      { m: v } = l,
      { N: y } = l,
      A = v[0],
      x = v[1],
      m = v[2],
      E = v[3],
      c = y == 0 ? 0 : 1 / y,
      o = [
        f[0] - A * A * c,
        f[1] - A * x * c,
        f[2] - A * m * c,
        f[3] - A * E * c,
        f[4] - x * A * c,
        f[5] - x * x * c,
        f[6] - x * m * c,
        f[7] - x * E * c,
        f[8] - m * A * c,
        f[9] - m * x * c,
        f[10] - m * m * c,
        f[11] - m * E * c,
        f[12] - E * A * c,
        f[13] - E * x * c,
        f[14] - E * m * c,
        f[15] - E * E * c,
      ],
      P = o,
      F = S;
    let k = [Math.random(), Math.random(), Math.random(), Math.random()],
      B = 0,
      L = 0;
    if (y != 0)
      for (
        let H = 0;
        H < 16 &&
        ((k = F.multVec(P, k)),
        (L = Math.sqrt(F.dot(k, k))),
        (k = F.sml(1 / L, k)),
        !(H != 0 && Math.abs(L - B) < 1e-9));
        H++
      )
        B = L;
    const j = [A * c, x * c, m * c, E * c];
    return {
      Cov: o,
      q: j,
      e: k,
      L: B,
      eMq255: F.dot(F.sml(255, j), k),
      eMq: F.dot(k, j),
      rgba:
        ((Math.round(255 * j[3]) << 24) |
          (Math.round(255 * j[2]) << 16) |
          (Math.round(255 * j[1]) << 8) |
          (Math.round(255 * j[0]) << 0)) >>>
        0,
    };
  }
  var S = {
    multVec: (l, f) => [
      l[0] * f[0] + l[1] * f[1] + l[2] * f[2] + l[3] * f[3],
      l[4] * f[0] + l[5] * f[1] + l[6] * f[2] + l[7] * f[3],
      l[8] * f[0] + l[9] * f[1] + l[10] * f[2] + l[11] * f[3],
      l[12] * f[0] + l[13] * f[1] + l[14] * f[2] + l[15] * f[3],
    ],
    dot: (l, f) => l[0] * f[0] + l[1] * f[1] + l[2] * f[2] + l[3] * f[3],
    sml: (l, f) => [l * f[0], l * f[1], l * f[2], l * f[3]],
  };
  ((he.encode = function (f, v, y, A, x, m, E) {
    (A == null && (A = 0), E == null && (E = !1));
    const c = n(f, v, y, A, [!1, !1, !1, 0, E, !1]);
    return (b(c, -1), p(c, v, y, x, m));
  }),
    (he.encodeLL = function (f, v, y, A, x, m, E, c) {
      const o = { ctype: 0 + (A == 1 ? 0 : 2) + (x == 0 ? 0 : 4), depth: m, frames: [] },
        P = (A + x) * m,
        F = P * v;
      for (let k = 0; k < f.length; k++)
        o.frames.push({
          rect: { x: 0, y: 0, width: v, height: y },
          img: new Uint8Array(f[k]),
          blend: 0,
          dispose: 1,
          bpp: Math.ceil(P / 8),
          bpl: Math.ceil(F / 8),
        });
      return (b(o, 0, !0), p(o, v, y, E, c));
    }),
    (he.encode.compress = n),
    (he.encode.dither = a),
    (he.quantize = U),
    (he.quantize.getKDtree = I),
    (he.quantize.getNearest = w));
})();
const Ze = {
  toArrayBuffer(M, R) {
    const N = M.width,
      d = M.height,
      e = N << 2,
      t = M.getContext("2d").getImageData(0, 0, N, d),
      u = new Uint32Array(t.data.buffer),
      a = ((32 * N + 31) / 32) << 2,
      p = a * d,
      b = 122 + p,
      n = new ArrayBuffer(b),
      i = new DataView(n),
      r = 1 << 20;
    let s,
      h,
      U,
      I,
      w = r,
      D = 0,
      T = 0,
      _ = 0;
    function O(l) {
      (i.setUint16(T, l, !0), (T += 2));
    }
    function g(l) {
      (i.setUint32(T, l, !0), (T += 4));
    }
    function S(l) {
      T += l;
    }
    (O(19778),
      g(b),
      S(4),
      g(122),
      g(108),
      g(N),
      g(-d >>> 0),
      O(1),
      O(32),
      g(3),
      g(p),
      g(2835),
      g(2835),
      S(8),
      g(16711680),
      g(65280),
      g(255),
      g(4278190080),
      g(1466527264),
      (function l() {
        for (; D < d && w > 0; ) {
          for (I = 122 + D * a, s = 0; s < e; )
            (w--, (h = u[_++]), (U = h >>> 24), i.setUint32(I + s, (h << 8) | U), (s += 4));
          D++;
        }
        _ < u.length ? ((w = r), setTimeout(l, Ze._dly)) : R(n);
      })());
  },
  toBlob(M, R) {
    this.toArrayBuffer(M, (N) => {
      R(new Blob([N], { type: "image/bmp" }));
    });
  },
  _dly: 9,
};
var fe = {
    CHROME: "CHROME",
    FIREFOX: "FIREFOX",
    DESKTOP_SAFARI: "DESKTOP_SAFARI",
    IE: "IE",
    IOS: "IOS",
    ETC: "ETC",
  },
  mt = {
    [fe.CHROME]: 16384,
    [fe.FIREFOX]: 11180,
    [fe.DESKTOP_SAFARI]: 16384,
    [fe.IE]: 8192,
    [fe.IOS]: 4096,
    [fe.ETC]: 8192,
  };
const ze = typeof window < "u",
  Xe = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope,
  Oe =
    ze &&
    window.cordova &&
    window.cordova.require &&
    window.cordova.require("cordova/modulemapper"),
  vt = (ze || Xe) && ((Oe && Oe.getOriginalSymbol(window, "File")) || (typeof File < "u" && File)),
  Ve =
    (ze || Xe) &&
    ((Oe && Oe.getOriginalSymbol(window, "FileReader")) || (typeof FileReader < "u" && FileReader));
function Qe(M, R, N = Date.now()) {
  return new Promise((d) => {
    const e = M.split(","),
      t = e[0].match(/:(.*?);/)[1],
      u = globalThis.atob(e[1]);
    let a = u.length;
    const p = new Uint8Array(a);
    for (; a--; ) p[a] = u.charCodeAt(a);
    const b = new Blob([p], { type: t });
    ((b.name = R), (b.lastModified = N), d(b));
  });
}
function Ye(M) {
  return new Promise((R, N) => {
    const d = new Ve();
    ((d.onload = () => R(d.result)), (d.onerror = (e) => N(e)), d.readAsDataURL(M));
  });
}
function Je(M) {
  return new Promise((R, N) => {
    const d = new Image();
    ((d.onload = () => R(d)), (d.onerror = (e) => N(e)), (d.src = M));
  });
}
function _e() {
  if (_e.cachedResult !== void 0) return _e.cachedResult;
  let M = fe.ETC;
  const { userAgent: R } = navigator;
  return (
    /Chrom(e|ium)/i.test(R)
      ? (M = fe.CHROME)
      : /iP(ad|od|hone)/i.test(R) && /WebKit/i.test(R)
        ? (M = fe.IOS)
        : /Safari/i.test(R)
          ? (M = fe.DESKTOP_SAFARI)
          : /Firefox/i.test(R)
            ? (M = fe.FIREFOX)
            : (/MSIE/i.test(R) || document.documentMode) && (M = fe.IE),
    (_e.cachedResult = M),
    _e.cachedResult
  );
}
function et(M, R) {
  const N = _e(),
    d = mt[N];
  let e = M,
    t = R,
    u = e * t;
  const a = e > t ? t / e : e / t;
  for (; u > d * d; ) {
    const p = (d + e) / 2,
      b = (d + t) / 2;
    (p < b ? ((t = b), (e = b * a)) : ((t = p * a), (e = p)), (u = e * t));
  }
  return { width: e, height: t };
}
function He(M, R) {
  let N, d;
  try {
    if (((N = new OffscreenCanvas(M, R)), (d = N.getContext("2d")), d === null))
      throw new Error("getContext of OffscreenCanvas returns null");
  } catch {
    ((N = document.createElement("canvas")), (d = N.getContext("2d")));
  }
  return ((N.width = M), (N.height = R), [N, d]);
}
function tt(M, R) {
  const { width: N, height: d } = et(M.width, M.height),
    [e, t] = He(N, d);
  return (
    R && /jpe?g/.test(R) && ((t.fillStyle = "white"), t.fillRect(0, 0, e.width, e.height)),
    t.drawImage(M, 0, 0, e.width, e.height),
    e
  );
}
function Pe() {
  return (
    Pe.cachedResult !== void 0 ||
      (Pe.cachedResult =
        ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
          navigator.platform,
        ) ||
        (navigator.userAgent.includes("Mac") && typeof document < "u" && "ontouchend" in document)),
    Pe.cachedResult
  );
}
function Ne(M, R = {}) {
  return new Promise(function (N, d) {
    let e, t;
    var u = function () {
        try {
          return ((t = tt(e, R.fileType || M.type)), N([e, t]));
        } catch (p) {
          return d(p);
        }
      },
      a = function (p) {
        try {
          var b = function (n) {
            try {
              throw n;
            } catch (i) {
              return d(i);
            }
          };
          try {
            let n;
            return Ye(M).then(function (i) {
              try {
                return (
                  (n = i),
                  Je(n).then(function (r) {
                    try {
                      return (
                        (e = r),
                        (function () {
                          try {
                            return u();
                          } catch (s) {
                            return d(s);
                          }
                        })()
                      );
                    } catch (s) {
                      return b(s);
                    }
                  }, b)
                );
              } catch (r) {
                return b(r);
              }
            }, b);
          } catch (n) {
            b(n);
          }
        } catch (n) {
          return d(n);
        }
      };
    try {
      if (Pe() || [fe.DESKTOP_SAFARI, fe.MOBILE_SAFARI].includes(_e()))
        throw new Error("Skip createImageBitmap on IOS and Safari");
      return createImageBitmap(M).then(function (p) {
        try {
          return ((e = p), u());
        } catch {
          return a();
        }
      }, a);
    } catch {
      a();
    }
  });
}
function De(M, R, N, d, e = 1) {
  return new Promise(function (t, u) {
    let a;
    if (R === "image/png") {
      let b, n, i;
      return (
        (b = M.getContext("2d")),
        ({ data: n } = b.getImageData(0, 0, M.width, M.height)),
        (i = he.encode([n.buffer], M.width, M.height, 4096 * e)),
        (a = new Blob([i], { type: R })),
        (a.name = N),
        (a.lastModified = d),
        p.call(this)
      );
    }
    {
      let b = function () {
        return p.call(this);
      };
      if (R === "image/bmp")
        return new Promise((n) => Ze.toBlob(M, n)).then(
          function (n) {
            try {
              return ((a = n), (a.name = N), (a.lastModified = d), b.call(this));
            } catch (i) {
              return u(i);
            }
          }.bind(this),
          u,
        );
      {
        let n = function () {
          return b.call(this);
        };
        if (typeof OffscreenCanvas == "function" && M instanceof OffscreenCanvas)
          return M.convertToBlob({ type: R, quality: e }).then(
            function (i) {
              try {
                return ((a = i), (a.name = N), (a.lastModified = d), n.call(this));
              } catch (r) {
                return u(r);
              }
            }.bind(this),
            u,
          );
        {
          let i;
          return (
            (i = M.toDataURL(R, e)),
            Qe(i, N, d).then(
              function (r) {
                try {
                  return ((a = r), n.call(this));
                } catch (s) {
                  return u(s);
                }
              }.bind(this),
              u,
            )
          );
        }
      }
    }
    function p() {
      return t(a);
    }
  });
}
function me(M) {
  ((M.width = 0), (M.height = 0));
}
function Me() {
  return new Promise(function (M, R) {
    let N, d, e, t;
    return Me.cachedResult !== void 0
      ? M(Me.cachedResult)
      : Qe(
          "data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==",
          "test.jpg",
          Date.now(),
        ).then(function (u) {
          try {
            return (
              (N = u),
              Ne(N).then(function (a) {
                try {
                  return (
                    (d = a[1]),
                    De(d, N.type, N.name, N.lastModified).then(function (p) {
                      try {
                        return (
                          (e = p),
                          me(d),
                          Ne(e).then(function (b) {
                            try {
                              return (
                                (t = b[0]),
                                (Me.cachedResult = t.width === 1 && t.height === 2),
                                M(Me.cachedResult)
                              );
                            } catch (n) {
                              return R(n);
                            }
                          }, R)
                        );
                      } catch (b) {
                        return R(b);
                      }
                    }, R)
                  );
                } catch (p) {
                  return R(p);
                }
              }, R)
            );
          } catch (a) {
            return R(a);
          }
        }, R);
  });
}
function rt(M) {
  return new Promise((R, N) => {
    const d = new Ve();
    ((d.onload = (e) => {
      const t = new DataView(e.target.result);
      if (t.getUint16(0, !1) != 65496) return R(-2);
      const u = t.byteLength;
      let a = 2;
      for (; a < u; ) {
        if (t.getUint16(a + 2, !1) <= 8) return R(-1);
        const p = t.getUint16(a, !1);
        if (((a += 2), p == 65505)) {
          if (t.getUint32((a += 2), !1) != 1165519206) return R(-1);
          const b = t.getUint16((a += 6), !1) == 18761;
          a += t.getUint32(a + 4, b);
          const n = t.getUint16(a, b);
          a += 2;
          for (let i = 0; i < n; i++)
            if (t.getUint16(a + 12 * i, b) == 274) return R(t.getUint16(a + 12 * i + 8, b));
        } else {
          if ((65280 & p) != 65280) break;
          a += t.getUint16(a, !1);
        }
      }
      return R(-1);
    }),
      (d.onerror = (e) => N(e)),
      d.readAsArrayBuffer(M));
  });
}
function nt(M, R) {
  const { width: N } = M,
    { height: d } = M,
    { maxWidthOrHeight: e } = R;
  let t,
    u = M;
  return (
    isFinite(e) &&
      (N > e || d > e) &&
      (([u, t] = He(N, d)),
      N > d ? ((u.width = e), (u.height = (d / N) * e)) : ((u.width = (N / d) * e), (u.height = e)),
      t.drawImage(M, 0, 0, u.width, u.height),
      me(M)),
    u
  );
}
function it(M, R) {
  const { width: N } = M,
    { height: d } = M,
    [e, t] = He(N, d);
  switch ((R > 4 && R < 9 ? ((e.width = d), (e.height = N)) : ((e.width = N), (e.height = d)), R)) {
    case 2:
      t.transform(-1, 0, 0, 1, N, 0);
      break;
    case 3:
      t.transform(-1, 0, 0, -1, N, d);
      break;
    case 4:
      t.transform(1, 0, 0, -1, 0, d);
      break;
    case 5:
      t.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      t.transform(0, 1, -1, 0, d, 0);
      break;
    case 7:
      t.transform(0, -1, -1, 0, d, N);
      break;
    case 8:
      t.transform(0, -1, 1, 0, 0, N);
  }
  return (t.drawImage(M, 0, 0, N, d), me(M), e);
}
function $e(M, R, N = 0) {
  return new Promise(function (d, e) {
    let t, u, a, p, b, n, i, r, s, h, U, I, w, D, T, _, O, g, S, l;
    function f(y = 5) {
      if (R.signal && R.signal.aborted) throw R.signal.reason;
      ((t += y), R.onProgress(Math.min(t, 100)));
    }
    function v(y) {
      if (R.signal && R.signal.aborted) throw R.signal.reason;
      ((t = Math.min(Math.max(y, t), 100)), R.onProgress(t));
    }
    return (
      (t = N),
      (u = R.maxIteration || 10),
      (a = 1024 * R.maxSizeMB * 1024),
      f(),
      Ne(M, R).then(
        function (y) {
          try {
            return (
              ([, p] = y),
              f(),
              (b = nt(p, R)),
              f(),
              new Promise(function (A, x) {
                var m;
                if (!(m = R.exifOrientation))
                  return rt(M).then(
                    function (c) {
                      try {
                        return ((m = c), E.call(this));
                      } catch (o) {
                        return x(o);
                      }
                    }.bind(this),
                    x,
                  );
                function E() {
                  return A(m);
                }
                return E.call(this);
              }).then(
                function (A) {
                  try {
                    return (
                      (n = A),
                      f(),
                      Me().then(
                        function (x) {
                          try {
                            return (
                              (i = x ? b : it(b, n)),
                              f(),
                              (r = R.initialQuality || 1),
                              (s = R.fileType || M.type),
                              De(i, s, M.name, M.lastModified, r).then(
                                function (m) {
                                  try {
                                    {
                                      let c = function () {
                                          if (u-- && (T > a || T > w)) {
                                            let P, F;
                                            return (
                                              (P = l ? 0.95 * S.width : S.width),
                                              (F = l ? 0.95 * S.height : S.height),
                                              ([O, g] = He(P, F)),
                                              g.drawImage(S, 0, 0, P, F),
                                              (r *= s === "image/png" ? 0.85 : 0.95),
                                              De(O, s, M.name, M.lastModified, r).then(function (
                                                k,
                                              ) {
                                                try {
                                                  return (
                                                    (_ = k),
                                                    me(S),
                                                    (S = O),
                                                    (T = _.size),
                                                    v(
                                                      Math.min(
                                                        99,
                                                        Math.floor(((D - T) / (D - a)) * 100),
                                                      ),
                                                    ),
                                                    c
                                                  );
                                                } catch (B) {
                                                  return e(B);
                                                }
                                              }, e)
                                            );
                                          }
                                          return [1];
                                        },
                                        o = function () {
                                          return (me(S), me(O), me(b), me(i), me(p), v(100), d(_));
                                        };
                                      if (
                                        ((h = m),
                                        f(),
                                        (U = h.size > a),
                                        (I = h.size > M.size),
                                        !U && !I)
                                      )
                                        return (v(100), d(h));
                                      var E;
                                      return (
                                        (w = M.size),
                                        (D = h.size),
                                        (T = D),
                                        (S = i),
                                        (l = !R.alwaysKeepResolution && U),
                                        (E = function (P) {
                                          for (; P; ) {
                                            if (P.then) return void P.then(E, e);
                                            try {
                                              if (P.pop) {
                                                if (P.length) return P.pop() ? o.call(this) : P;
                                                P = c;
                                              } else P = P.call(this);
                                            } catch (F) {
                                              return e(F);
                                            }
                                          }
                                        }.bind(this))(c)
                                      );
                                    }
                                  } catch (c) {
                                    return e(c);
                                  }
                                }.bind(this),
                                e,
                              )
                            );
                          } catch (m) {
                            return e(m);
                          }
                        }.bind(this),
                        e,
                      )
                    );
                  } catch (x) {
                    return e(x);
                  }
                }.bind(this),
                e,
              )
            );
          } catch (A) {
            return e(A);
          }
        }.bind(this),
        e,
      )
    );
  });
}
const bt = `
let scriptImported = false
self.addEventListener('message', async (e) => {
  const { file, id, imageCompressionLibUrl, options } = e.data
  options.onProgress = (progress) => self.postMessage({ progress, id })
  try {
    if (!scriptImported) {
      // console.log('[worker] importScripts', imageCompressionLibUrl)
      self.importScripts(imageCompressionLibUrl)
      scriptImported = true
    }
    // console.log('[worker] self', self)
    const compressedFile = await imageCompression(file, options)
    self.postMessage({ file: compressedFile, id })
  } catch (e) {
    // console.error('[worker] error', e)
    self.postMessage({ error: e.message + '\\n' + e.stack, id })
  }
})
`;
let Be;
function wt(M, R) {
  return new Promise((N, d) => {
    Be ||
      (Be = (function (u) {
        const a = [];
        return (a.push(u), URL.createObjectURL(new Blob(a)));
      })(bt));
    const e = new Worker(Be);
    (e.addEventListener("message", function (u) {
      if (R.signal && R.signal.aborted) e.terminate();
      else if (u.data.progress === void 0) {
        if (u.data.error) return (d(new Error(u.data.error)), void e.terminate());
        (N(u.data.file), e.terminate());
      } else R.onProgress(u.data.progress);
    }),
      e.addEventListener("error", d),
      R.signal &&
        R.signal.addEventListener("abort", () => {
          (d(R.signal.reason), e.terminate());
        }),
      e.postMessage({
        file: M,
        imageCompressionLibUrl: R.libURL,
        options: { ...R, onProgress: void 0, signal: void 0 },
      }));
  });
}
function oe(M, R) {
  return new Promise(function (N, d) {
    let e, t, u, a, p, b;
    if (
      ((e = { ...R }),
      (u = 0),
      ({ onProgress: a } = e),
      (e.maxSizeMB = e.maxSizeMB || Number.POSITIVE_INFINITY),
      (p = typeof e.useWebWorker != "boolean" || e.useWebWorker),
      delete e.useWebWorker,
      (e.onProgress = (s) => {
        ((u = s), typeof a == "function" && a(u));
      }),
      !(M instanceof Blob || M instanceof vt))
    )
      return d(new Error("The file given is not an instance of Blob or File"));
    if (!/^image/.test(M.type)) return d(new Error("The file given is not an image"));
    if (
      ((b = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope),
      !p || typeof Worker != "function" || b)
    )
      return $e(M, e).then(
        function (s) {
          try {
            return ((t = s), r.call(this));
          } catch (h) {
            return d(h);
          }
        }.bind(this),
        d,
      );
    var n = function () {
        try {
          return r.call(this);
        } catch (s) {
          return d(s);
        }
      }.bind(this),
      i = function (s) {
        try {
          return $e(M, e).then(function (h) {
            try {
              return ((t = h), n());
            } catch (U) {
              return d(U);
            }
          }, d);
        } catch (h) {
          return d(h);
        }
      };
    try {
      return (
        (e.libURL =
          e.libURL ||
          "https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js"),
        wt(M, e).then(function (s) {
          try {
            return ((t = s), n());
          } catch {
            return i();
          }
        }, i)
      );
    } catch {
      i();
    }
    function r() {
      try {
        ((t.name = M.name), (t.lastModified = M.lastModified));
      } catch {}
      try {
        e.preserveExif &&
          M.type === "image/jpeg" &&
          (!e.fileType || (e.fileType && e.fileType === M.type)) &&
          (t = Ke(M, t));
      } catch {}
      return N(t);
    }
  });
}
((oe.getDataUrlFromFile = Ye),
  (oe.getFilefromDataUrl = Qe),
  (oe.loadImage = Je),
  (oe.drawImageInCanvas = tt),
  (oe.drawFileInCanvas = Ne),
  (oe.canvasToFile = De),
  (oe.getExifOrientation = rt),
  (oe.handleMaxWidthOrHeight = nt),
  (oe.followExifOrientation = it),
  (oe.cleanupCanvasMemory = me),
  (oe.isAutoOrientationInBrowser = Me),
  (oe.approximateBelowMaximumCanvasSizeOfBrowser = et),
  (oe.copyExifWithoutOrientation = Ke),
  (oe.getBrowserName = _e),
  (oe.version = "2.0.2"));
async function At(M, R = "site") {
  const N = { maxSizeMB: 2, maxWidthOrHeight: 1920, useWebWorker: !0, fileType: "image/webp" };
  let d = M;
  try {
    d = await oe(M, N);
  } catch (p) {
    console.warn("A compressão de imagem falhou, fazendo upload do arquivo original", p);
  }
  const e = d.type === "image/webp" ? "webp" : (M.name.split(".").pop() ?? "jpg"),
    t = `${R}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${e}`,
    { error: u } = await qe.storage
      .from("products")
      .upload(t, d, { cacheControl: "3600", upsert: !1, contentType: d.type });
  if (u) throw u;
  const { data: a } = qe.storage.from("products").getPublicUrl(t);
  return a.publicUrl;
}
function Ft({ value: M, onChange: R, folder: N = "site", compact: d = !1 }) {
  const [e, t] = st.useState(!1),
    u = () => {
      switch (N) {
        case "category_icons":
          return "Recomendado: Imagem PNG ou JPG de 100x100px. Máx 10MB.";
        case "banners":
          return "Recomendado: 1920x800 (Desktop) ou 800x1200 (Mobile). Máx 10MB.";
        case "products":
          return "Recomendado: 800x1000 (Formato retrato 4:5). Máx 10MB.";
        case "categories":
          return "Recomendado: Ícone PNG ou JPG de 100x100px. Máx 10MB.";
        case "collections":
          return "Recomendado: 1200x600 (Formato paisagem). Máx 10MB.";
        default:
          return "Formatos aceitos: JPG, PNG, WEBP. Tamanho máx: 10MB.";
      }
    },
    a = async (b) => {
      if (b.size > 10 * 1024 * 1024) {
        Te.error("O arquivo é muito grande. O limite máximo é 10MB.");
        return;
      }
      if (!b.type.startsWith("image/")) {
        Te.error("Por favor, selecione apenas arquivos de imagem (PNG ou JPG).");
        return;
      }
      t(!0);
      try {
        const n = await At(b, N);
        (R(n), Te.success("Ícone/Imagem enviado com sucesso!"));
      } catch (n) {
        Te.error(n.message ?? "Ocorreu um erro ao enviar a imagem.");
      } finally {
        t(!1);
      }
    };
  if (M)
    return ee.jsx("div", {
      className: "space-y-2",
      children: ee.jsxs("div", {
        className: `relative bg-secondary rounded-sm overflow-hidden border border-border flex items-center justify-center ${d || N === "category_icons" ? "w-24 h-24 aspect-square" : "aspect-video w-full max-w-md"}`,
        children: [
          ee.jsx("img", {
            src: M,
            alt: "Preview do ícone",
            className: "h-full w-full object-cover",
          }),
          ee.jsx("button", {
            type: "button",
            onClick: () => R(""),
            className:
              "absolute top-1 right-1 bg-background/90 rounded-full p-1 hover:bg-destructive hover:text-white transition-colors shadow-sm",
            title: "Remover imagem",
            children: ee.jsx(ft, { className: "h-3.5 w-3.5" }),
          }),
        ],
      }),
    });
  const p = d || N === "category_icons";
  return ee.jsxs("div", {
    className: `space-y-2 ${p ? "w-auto" : "max-w-md w-full"}`,
    children: [
      ee.jsxs("label", {
        className: `flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-border rounded-sm cursor-pointer hover:bg-secondary/50 transition-colors text-xs text-muted-foreground bg-secondary/20 p-2 ${p ? "w-28 h-28 aspect-square" : "aspect-video w-full"}`,
        children: [
          e
            ? ee.jsxs(ee.Fragment, {
                children: [
                  ee.jsx(lt, { className: "h-5 w-5 animate-spin text-primary" }),
                  ee.jsx("span", {
                    className: "text-[11px] text-center font-medium",
                    children: "Enviando...",
                  }),
                ],
              })
            : ee.jsxs(ee.Fragment, {
                children: [
                  ee.jsx(ut, { className: "h-5 w-5 text-muted-foreground" }),
                  ee.jsx("span", {
                    className: "font-medium text-[11px] text-center",
                    children: "Enviar ícone",
                  }),
                  ee.jsx("span", {
                    className: "text-[10px] text-muted-foreground/70",
                    children: "PNG ou JPG (100x100)",
                  }),
                ],
              }),
          ee.jsx("input", {
            type: "file",
            accept: "image/jpeg,image/png,image/webp,image/gif",
            className: "hidden",
            onChange: (b) => {
              b.target.files?.[0] && (a(b.target.files[0]), (b.target.value = ""));
            },
            disabled: e,
          }),
        ],
      }),
      ee.jsxs("div", {
        className:
          "flex items-start gap-1.5 text-[11px] text-muted-foreground bg-secondary/30 p-1.5 rounded max-w-xs",
        children: [
          ee.jsx(ct, { className: "h-3 w-3 mt-0.5 shrink-0" }),
          ee.jsx("p", { children: u() }),
        ],
      }),
    ],
  });
}
export { Ft as I };
